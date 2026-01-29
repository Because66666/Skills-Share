import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        avatar: string | null;
        status: string;
        lastLogin: Date | null;
        tenantId: string | null;
        roleId: string | null;
    }>;
    findAll(skip?: string, take?: string, search?: string, roleId?: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        avatar: string | null;
        status: string;
        lastLogin: Date | null;
        tenantId: string | null;
        roleId: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        avatar: string | null;
        status: string;
        lastLogin: Date | null;
        tenantId: string | null;
        roleId: string | null;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        avatar: string | null;
        status: string;
        lastLogin: Date | null;
        tenantId: string | null;
        roleId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        avatar: string | null;
        status: string;
        lastLogin: Date | null;
        tenantId: string | null;
        roleId: string | null;
    }>;
}
