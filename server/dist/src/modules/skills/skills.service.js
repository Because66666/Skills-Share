"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = require("fs");
const path_1 = require("path");
let SkillsService = class SkillsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createSkillDto, userId) {
        const { tags, attachmentIds } = createSkillDto, skillData = __rest(createSkillDto, ["tags", "attachmentIds"]);
        if (attachmentIds && attachmentIds.length > 1) {
            throw new common_1.BadRequestException('Only one attachment is allowed per skill');
        }
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        return this.prisma.skill.create({
            data: Object.assign(Object.assign({}, skillData), { author: (user === null || user === void 0 ? void 0 : user.name) || 'Unknown', userId, status: 'pending', icon: skillData.icon || 'Zap', color: skillData.color || 'bg-blue-100 text-blue-600', tags: {
                    connectOrCreate: tags === null || tags === void 0 ? void 0 : tags.map(tag => ({
                        where: { name: tag },
                        create: { name: tag },
                    })),
                }, attachments: attachmentIds ? {
                    connect: attachmentIds.map(id => ({ id })),
                } : undefined }),
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
    async findAllAdmin(status) {
        return this.prisma.skill.findMany({
            where: status ? { status } : undefined,
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
    async findOne(id) {
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
            return null;
        }
        return skill;
    }
    async update(id, updateSkillDto, userId) {
        const skill = await this.prisma.skill.findUnique({ where: { id } });
        if (!skill) {
            throw new common_1.NotFoundException(`Skill with ID ${id} not found`);
        }
        if (skill.userId !== userId) {
            throw new common_1.ForbiddenException('You can only update your own skills');
        }
        const { tags, attachmentIds } = updateSkillDto, skillData = __rest(updateSkillDto, ["tags", "attachmentIds"]);
        if (attachmentIds && attachmentIds.length > 1) {
            throw new common_1.BadRequestException('Only one attachment is allowed per skill');
        }
        return this.prisma.skill.update({
            where: { id },
            data: Object.assign(Object.assign(Object.assign({}, skillData), (tags && {
                tags: {
                    set: [],
                    connectOrCreate: tags.map(tag => ({
                        where: { name: tag },
                        create: { name: tag },
                    })),
                },
            })), (attachmentIds && {
                attachments: {
                    set: attachmentIds.map(id => ({ id })),
                },
            })),
            include: { tags: true, attachments: true },
        });
    }
    async remove(id, userId) {
        const skill = await this.prisma.skill.findUnique({ where: { id } });
        if (!skill) {
            throw new common_1.NotFoundException(`Skill with ID ${id} not found`);
        }
        if (skill.userId !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own skills');
        }
        return this.prisma.skill.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async hardDelete(id) {
        const skill = await this.prisma.skill.findUnique({
            where: { id },
            include: { attachments: true }
        });
        if (!skill) {
            throw new common_1.NotFoundException(`Skill with ID ${id} not found`);
        }
        if (skill.attachments && skill.attachments.length > 0) {
            for (const attachment of skill.attachments) {
                try {
                    const relativePath = attachment.path.startsWith('/') ? attachment.path.substring(1) : attachment.path;
                    const absolutePath = (0, path_1.join)(process.cwd(), relativePath);
                    if (fs.existsSync(absolutePath)) {
                        fs.unlinkSync(absolutePath);
                    }
                }
                catch (error) {
                    console.error(`Failed to delete file for attachment ${attachment.id}:`, error);
                }
            }
        }
        return this.prisma.skill.delete({
            where: { id },
        });
    }
    async updateStatus(id, status) {
        return this.prisma.skill.update({
            where: { id },
            data: { status },
        });
    }
    async findByUser(userId, currentUserId) {
        const isOwner = userId === currentUserId;
        return this.prisma.skill.findMany({
            where: Object.assign({ userId, deletedAt: null }, (isOwner ? {} : { status: 'approved' })),
            include: {
                tags: true,
                user: {
                    select: {
                        name: true,
                        avatar: true
                    }
                },
                comments: {
                    select: { id: true }
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
    async addComment(skillId, userId, createCommentDto) {
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
    async addRating(skillId, userId, createRatingDto) {
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
        }
        else {
            rating = await this.prisma.rating.create({
                data: {
                    value: createRatingDto.value,
                    skillId,
                    userId,
                },
            });
        }
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
};
exports.SkillsService = SkillsService;
exports.SkillsService = SkillsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SkillsService);
//# sourceMappingURL=skills.service.js.map