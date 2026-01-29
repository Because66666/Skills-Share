import { IsString, IsNotEmpty, IsOptional, IsArray, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDto {
  @ApiProperty({ description: 'The title of the skill' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Short description of the skill' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Markdown content', required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ description: 'Array of tag names', required: false })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({ description: 'Icon name', required: false })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty({ description: 'Tailwind color classes', required: false })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({ description: 'Array of attachment IDs', required: false })
  @IsArray()
  @IsOptional()
  attachmentIds?: string[];
}

export class CreateCommentDto {
  @ApiProperty({ description: 'Comment content' })
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class CreateRatingDto {
  @ApiProperty({ description: 'Rating value (1-5)' })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  value: number;
}
