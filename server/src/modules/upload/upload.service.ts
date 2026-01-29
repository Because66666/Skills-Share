import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async saveFileRecord(file: Express.Multer.File, uploaderId: string) {
    // Ensure the path is relative for frontend access, but full path for storage logic if needed.
    // Here we store the relative path that will be served by static file server.
    const relativePath = `/uploads/skills/${file.filename}`;
    
    return this.prisma.attachment.create({
      data: {
        originalName: file.originalname,
        fileName: file.filename,
        mimeType: file.mimetype,
        size: file.size,
        path: relativePath,
        uploaderId,
      },
    });
  }

  async getCleanupStats() {
    // Find orphans (skillId is null)
    // Optional: Add time filter to avoid deleting files currently being uploaded (e.g., created > 1 hour ago)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const orphanCount = await this.prisma.attachment.count({
      where: { 
        skillId: null,
        createdAt: { lt: oneHourAgo }
      }
    });
    
    const orphans = await this.prisma.attachment.findMany({
       where: { 
         skillId: null,
         createdAt: { lt: oneHourAgo }
       },
       select: { size: true }
    });
    
    const totalSize = orphans.reduce((acc, curr) => acc + curr.size, 0);
    
    return {
      count: orphanCount,
      size: totalSize // bytes
    };
  }

  async cleanupOrphans() {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    // Find all orphans
    const orphans = await this.prisma.attachment.findMany({
      where: { 
        skillId: null,
        createdAt: { lt: oneHourAgo }
      }
    });
    
    let deletedCount = 0;
    let deletedSize = 0;

    for (const orphan of orphans) {
      try {
        // orphan.path is like /uploads/skills/xxx.zip
        const relativePath = orphan.path.startsWith('/') ? orphan.path.substring(1) : orphan.path;
        const absolutePath = join(process.cwd(), relativePath);
        
        if (fs.existsSync(absolutePath)) {
          fs.unlinkSync(absolutePath);
        }
        
        deletedCount++;
        deletedSize += orphan.size;
      } catch (error) {
        console.error(`Failed to delete orphan file ${orphan.id}:`, error);
      }
    }

    // Delete from DB
    await this.prisma.attachment.deleteMany({
      where: { 
        skillId: null,
        createdAt: { lt: oneHourAgo }
      }
    });

    return {
      deletedCount,
      deletedSize
    };
  }
}
