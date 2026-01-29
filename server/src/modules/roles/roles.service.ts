import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role, Prisma } from '@prisma/client';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.prisma.role.create({
      data: createRoleDto,
    });
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RoleWhereUniqueInput;
    where?: Prisma.RoleWhereInput;
    orderBy?: Prisma.RoleOrderByWithRelationInput;
  }): Promise<Role[]> {
    const { skip, take, cursor, where, orderBy } = params || {};
    return this.prisma.role.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        _count: {
          select: { users: true },
        },
      },
    });
  }

  async findOne(id: string): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  async remove(id: string): Promise<Role> {
    return this.prisma.role.delete({
      where: { id },
    });
  }
}
