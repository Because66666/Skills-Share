import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        user: any;
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        user: any;
    }>;
    getProfile(req: any): any;
}
