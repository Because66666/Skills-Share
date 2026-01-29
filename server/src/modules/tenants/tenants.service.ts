import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Tenant, Prisma } from '@prisma/client';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    return this.prisma.tenant.create({
      data: createTenantDto,
    });
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TenantWhereUniqueInput;
    where?: Prisma.TenantWhereInput;
    orderBy?: Prisma.TenantOrderByWithRelationInput;
  }): Promise<Tenant[]> {
    const { skip, take, cursor, where, orderBy } = params || {};
    return this.prisma.tenant.findMany({
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

  async findOne(id: string): Promise<Tenant | null> {
    return this.prisma.tenant.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    return this.prisma.tenant.update({
      where: { id },
      data: updateTenantDto,
    });
  }

  async remove(id: string): Promise<Tenant> {
    return this.prisma.tenant.delete({
      where: { id },
    });
  }
}
