import { SkillsService } from './skills.service';
import { CreateSkillDto, CreateCommentDto, CreateRatingDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
export declare class SkillsController {
    private readonly skillsService;
    constructor(skillsService: SkillsService);
    create(createSkillDto: CreateSkillDto, req: any): Promise<{
        tags: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        attachments: {
            id: string;
            createdAt: Date;
            originalName: string;
            fileName: string;
            mimeType: string;
            size: number;
            path: string;
            uploaderId: string;
            skillId: string | null;
        }[];
    } & {
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        title: string;
        content: string | null;
        author: string;
        userId: string | null;
        downloadCount: number;
        rating: number;
        publishDate: Date;
        icon: string;
        color: string;
        deletedAt: Date | null;
    }>;
    findAll(): Promise<({
        user: {
            name: string;
            avatar: string;
        };
        tags: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        title: string;
        content: string | null;
        author: string;
        userId: string | null;
        downloadCount: number;
        rating: number;
        publishDate: Date;
        icon: string;
        color: string;
        deletedAt: Date | null;
    })[]>;
    findAllAdmin(req: any, status?: string): Promise<({
        user: {
            name: string;
            email: string;
            avatar: string;
        };
        tags: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        title: string;
        content: string | null;
        author: string;
        userId: string | null;
        downloadCount: number;
        rating: number;
        publishDate: Date;
        icon: string;
        color: string;
        deletedAt: Date | null;
    })[]>;
    updateStatus(id: string, body: {
        status: string;
    }, req: any): Promise<{
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        title: string;
        content: string | null;
        author: string;
        userId: string | null;
        downloadCount: number;
        rating: number;
        publishDate: Date;
        icon: string;
        color: string;
        deletedAt: Date | null;
    }>;
    findOne(id: string): Promise<{
        comments: ({
            user: {
                id: string;
                name: string;
                avatar: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            userId: string;
            skillId: string;
        })[];
        ratings: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            value: number;
            skillId: string;
        }[];
        user: {
            id: string;
            name: string;
            email: string;
            avatar: string;
        };
        tags: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        attachments: {
            id: string;
            createdAt: Date;
            originalName: string;
            fileName: string;
            mimeType: string;
            size: number;
            path: string;
            uploaderId: string;
            skillId: string | null;
        }[];
    } & {
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        title: string;
        content: string | null;
        author: string;
        userId: string | null;
        downloadCount: number;
        rating: number;
        publishDate: Date;
        icon: string;
        color: string;
        deletedAt: Date | null;
    }>;
    update(id: string, updateSkillDto: UpdateSkillDto, req: any): Promise<{
        tags: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        attachments: {
            id: string;
            createdAt: Date;
            originalName: string;
            fileName: string;
            mimeType: string;
            size: number;
            path: string;
            uploaderId: string;
            skillId: string | null;
        }[];
    } & {
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        title: string;
        content: string | null;
        author: string;
        userId: string | null;
        downloadCount: number;
        rating: number;
        publishDate: Date;
        icon: string;
        color: string;
        deletedAt: Date | null;
    }>;
    remove(id: string, req: any): Promise<{
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        title: string;
        content: string | null;
        author: string;
        userId: string | null;
        downloadCount: number;
        rating: number;
        publishDate: Date;
        icon: string;
        color: string;
        deletedAt: Date | null;
    }>;
    hardDelete(id: string, req: any): Promise<{
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        title: string;
        content: string | null;
        author: string;
        userId: string | null;
        downloadCount: number;
        rating: number;
        publishDate: Date;
        icon: string;
        color: string;
        deletedAt: Date | null;
    }>;
    findByUser(userId: string, req: any): Promise<({
        comments: {
            id: string;
        }[];
        ratings: {
            value: number;
        }[];
        user: {
            name: string;
            avatar: string;
        };
        tags: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        title: string;
        content: string | null;
        author: string;
        userId: string | null;
        downloadCount: number;
        rating: number;
        publishDate: Date;
        icon: string;
        color: string;
        deletedAt: Date | null;
    })[]>;
    addComment(id: string, createCommentDto: CreateCommentDto, req: any): Promise<{
        user: {
            id: string;
            name: string;
            avatar: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        userId: string;
        skillId: string;
    }>;
    addRating(id: string, createRatingDto: CreateRatingDto, req: any): Promise<any>;
}
