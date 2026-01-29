import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role?.name };
    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOne(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('用户已存在');
    }

    let roleId = createUserDto.roleId;
    let tenantId = createUserDto.tenantId;

    if (!roleId) {
      const userRole = await this.prisma.role.findUnique({ where: { name: 'user' } });
      roleId = userRole?.id;
    }

    if (!tenantId) {
      const defaultTenant = await this.prisma.tenant.findUnique({ where: { code: 'default_org' } });
      tenantId = defaultTenant?.id;
    }

    const newUser = await this.usersService.create({
      ...createUserDto,
      roleId,
      tenantId,
    });

    return this.login(newUser);
  }
}
