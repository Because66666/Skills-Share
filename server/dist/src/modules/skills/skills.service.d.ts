import { PrismaService } from '../prisma/prisma.service';
import { CreateSkillDto, CreateCommentDto, CreateRatingDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
export declare class SkillsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createSkillDto: CreateSkillDto, userId: string): Promise<{
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
    findAllAdmin(status?: string): Promise<({
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
    update(id: string, updateSkillDto: UpdateSkillDto, userId: string): Promise<{
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
    remove(id: string, userId: string): Promise<{
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
    hardDelete(id: string): Promise<{
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
    updateStatus(id: string, status: string): Promise<{
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
    findByUser(userId: string, currentUserId?: string): Promise<({
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
    addComment(skillId: string, userId: string, createCommentDto: CreateCommentDto): Promise<{
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
    addRating(skillId: string, userId: string, createRatingDto: CreateRatingDto): Promise<any>;
}
