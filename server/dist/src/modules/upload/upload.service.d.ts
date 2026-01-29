import { PrismaService } from '../prisma/prisma.service';
export declare class UploadService {
    private prisma;
    constructor(prisma: PrismaService);
    saveFileRecord(file: Express.Multer.File, uploaderId: string): Promise<{
        id: string;
        createdAt: Date;
        originalName: string;
        fileName: string;
        mimeType: string;
        size: number;
        path: string;
        uploaderId: string;
        skillId: string | null;
    }>;
    getCleanupStats(): Promise<{
        count: number;
        size: number;
    }>;
    cleanupOrphans(): Promise<{
        deletedCount: number;
        deletedSize: number;
    }>;
}
