import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        permissions: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(skip?: string, take?: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        permissions: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        permissions: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        permissions: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        permissions: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
