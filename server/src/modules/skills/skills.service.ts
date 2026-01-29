import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSkillDto, CreateCommentDto, CreateRatingDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  async create(createSkillDto: CreateSkillDto, userId: string) {
    const { tags, attachmentIds, ...skillData } = createSkillDto;
    
    if (attachmentIds && attachmentIds.length > 1) {
      throw new BadRequestException('Only one attachment is allowed per skill');
    }

    // Fetch user to get name for author field (legacy support)
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    return this.prisma.skill.create({
      data: {
        ...skillData,
        author: user?.name || 'Unknown',
        userId,
        status: 'pending', // Default to pending
        icon: skillData.icon || 'Zap',
        color: skillData.color || 'bg-blue-100 text-blue-600',
        tags: {
          connectOrCreate: tags?.map(tag => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
        attachments: attachmentIds ? {
          connect: attachmentIds.map(id => ({ id })),
        } : undefined,
      },
      include: {
        tags: true,
        attachments: true,
      },
    });
  }

  async findAll() {
    return this.prisma.skill.findMany({
      where: {
        status: 'approved',
        deletedAt: null,
      },
      include: {
        tags: true,
        user: {
          select: {
            name: true,
            avatar: true
          }
        }
      },
      orderBy: {
        publishDate: 'desc',
      },
    });
  }

  async findAllAdmin(status?: string) {
    return this.prisma.skill.findMany({
      where: status ? { status } : undefined, // Admin sees deleted ones too? Or we should filter?
                                            // Usually admin dashboard might want to see deleted ones or have a filter.
                                            // For now I won't filter deletedAt here so admin can see them.
      include: {
        tags: true,
        user: {
          select: {
            name: true,
            email: true,
            avatar: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const skill = await this.prisma.skill.findUnique({
      where: { id },
      include: {
        tags: true,
        attachments: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            avatar: true,
          },
        },
        comments: {
          include: {
            user: { select: { id: true, name: true, avatar: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
        ratings: true,
      },
    });

    if (skill && skill.deletedAt) {
      // Treat soft deleted as not found for public access
      // But maybe we need it for admin?
      // For now, let's return null or throw?
      // Existing logic returns null if not found.
      // But findUnique returns null if not found.
      return null;
    }
    
    return skill;
  }

  async update(id: string, updateSkillDto: UpdateSkillDto, userId: string) {
    const skill = await this.prisma.skill.findUnique({ where: { id } });
    
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    
    if (skill.userId !== userId) {
      throw new ForbiddenException('You can only update your own skills');
    }

    const { tags, attachmentIds, ...skillData } = updateSkillDto;

    if (attachmentIds && attachmentIds.length > 1) {
      throw new BadRequestException('Only one attachment is allowed per skill');
    }

    return this.prisma.skill.update({
      where: { id },
      data: {
        ...skillData,
        ...(tags && {
          tags: {
            set: [], // Clear existing relations
            connectOrCreate: tags.map(tag => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        }),
        ...(attachmentIds && {
          attachments: {
            set: attachmentIds.map(id => ({ id })), // Replace existing attachments
          },
        }),
      },
      include: { tags: true, attachments: true },
    });
  }

  async remove(id: string, userId: string) {
    const skill = await this.prisma.skill.findUnique({ where: { id } });
    
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    
    if (skill.userId !== userId) {
      throw new ForbiddenException('You can only delete your own skills');
    }

    // Soft delete
    return this.prisma.skill.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async hardDelete(id: string) {
    const skill = await this.prisma.skill.findUnique({ 
      where: { id },
      include: { attachments: true }
    });
    
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    // Delete physical files
    if (skill.attachments && skill.attachments.length > 0) {
      for (const attachment of skill.attachments) {
        try {
          // attachment.path is relative, e.g. /uploads/skills/xxx.zip
          // We need to resolve it to absolute path
          // Assuming the path stored starts with /uploads/skills/
          // and the physical location is server/uploads/skills/
          
          // Remove leading slash if present
          const relativePath = attachment.path.startsWith('/') ? attachment.path.substring(1) : attachment.path;
          const absolutePath = join(process.cwd(), relativePath);
          
          if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
          }
        } catch (error) {
          console.error(`Failed to delete file for attachment ${attachment.id}:`, error);
        }
      }
    }

    // Database cascade delete will handle attachments records, comments, ratings
    return this.prisma.skill.delete({
      where: { id },
    });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.skill.update({
      where: { id },
      data: { status },
    });
  }

  async findByUser(userId: string, currentUserId?: string) {
    const isOwner = userId === currentUserId;
    return this.prisma.skill.findMany({
      where: { 
        userId,
        deletedAt: null,
        ...(isOwner ? {} : { status: 'approved' })
      },
      include: {
        tags: true,
        user: {
          select: {
            name: true,
            avatar: true
          }
        },
        comments: {
           select: { id: true } // Just count
        },
        ratings: {
           select: { value: true }
        }
      },
      orderBy: {
        publishDate: 'desc',
      },
    });
  }

  async addComment(skillId: string, userId: string, createCommentDto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        skillId,
        userId,
      },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
      },
    });
  }

  async addRating(skillId: string, userId: string, createRatingDto: CreateRatingDto) {
    // Check if rating exists
    const existing = await this.prisma.rating.findUnique({
      where: {
        userId_skillId: { userId, skillId },
      },
    });

    let rating;
    if (existing) {
      rating = await this.prisma.rating.update({
        where: { id: existing.id },
        data: { value: createRatingDto.value },
      });
    } else {
      rating = await this.prisma.rating.create({
        data: {
          value: createRatingDto.value,
          skillId,
          userId,
        },
      });
    }

    // Recalculate average rating
    const aggregations = await this.prisma.rating.aggregate({
      where: { skillId },
      _avg: { value: true },
    });

    await this.prisma.skill.update({
      where: { id: skillId },
      data: { rating: aggregations._avg.value || 0 },
    });

    return rating;
  }
}
