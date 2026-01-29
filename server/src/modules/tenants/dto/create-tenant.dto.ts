import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty({ example: 'Acme Corp', description: '租户名称' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'acme', description: '租户编码' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 'A technology company', description: '租户描述' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'active', description: '状态' })
  @IsString()
  @IsOptional()
  status?: string;
}
