import { PrismaService } from '../prisma/prisma.service';
import { Role, Prisma } from '@prisma/client';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRoleDto: CreateRoleDto): Promise<Role>;
    findAll(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.RoleWhereUniqueInput;
        where?: Prisma.RoleWhereInput;
        orderBy?: Prisma.RoleOrderByWithRelationInput;
    }): Promise<Role[]>;
    findOne(id: string): Promise<Role | null>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role>;
    remove(id: string): Promise<Role>;
}
