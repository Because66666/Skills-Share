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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = require("fs");
const path_1 = require("path");
let UploadService = class UploadService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async saveFileRecord(file, uploaderId) {
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
            size: totalSize
        };
    }
    async cleanupOrphans() {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
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
                const relativePath = orphan.path.startsWith('/') ? orphan.path.substring(1) : orphan.path;
                const absolutePath = (0, path_1.join)(process.cwd(), relativePath);
                if (fs.existsSync(absolutePath)) {
                    fs.unlinkSync(absolutePath);
                }
                deletedCount++;
                deletedSize += orphan.size;
            }
            catch (error) {
                console.error(`Failed to delete orphan file ${orphan.id}:`, error);
            }
        }
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
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UploadService);
//# sourceMappingURL=upload.service.js.map