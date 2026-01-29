import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: '角色名称' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '管理员', description: '角色描述' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '["user:read", "user:write"]', description: '权限列表(JSON字符串)' })
  @IsString()
  @IsOptional()
  permissions?: string;
}
