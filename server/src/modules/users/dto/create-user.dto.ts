import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: '用户邮箱' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: '用户密码' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '张三', description: '用户姓名' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'uuid-role-id', description: '角色ID' })
  @IsString()
  @IsOptional()
  roleId?: string;

  @ApiProperty({ example: 'uuid-tenant-id', description: '租户ID' })
  @IsString()
  @IsOptional()
  tenantId?: string;
}
