export declare class CreateSkillDto {
    title: string;
    description: string;
    content?: string;
    tags?: string[];
    icon?: string;
    color?: string;
    attachmentIds?: string[];
}
export declare class CreateCommentDto {
    content: string;
}
export declare class CreateRatingDto {
    value: number;
}
