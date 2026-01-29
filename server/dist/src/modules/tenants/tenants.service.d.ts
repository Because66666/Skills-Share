import { PrismaService } from '../prisma/prisma.service';
import { Tenant, Prisma } from '@prisma/client';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
export declare class TenantsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTenantDto: CreateTenantDto): Promise<Tenant>;
    findAll(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.TenantWhereUniqueInput;
        where?: Prisma.TenantWhereInput;
        orderBy?: Prisma.TenantOrderByWithRelationInput;
    }): Promise<Tenant[]>;
    findOne(id: string): Promise<Tenant | null>;
    update(id: string, updateTenantDto: UpdateTenantDto): Promise<Tenant>;
    remove(id: string): Promise<Tenant>;
}
