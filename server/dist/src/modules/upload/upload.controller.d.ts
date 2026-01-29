import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadFile(file: Express.Multer.File): Promise<{
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
    getStats(req: any): Promise<{
        count: number;
        size: number;
    }>;
    cleanup(req: any): Promise<{
        deletedCount: number;
        deletedSize: number;
    }>;
}
