import { Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
export declare const jwtConstants: {
    secret: string;
};
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    constructor(usersService: UsersService);
    validate(payload: any): Promise<{
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
export {};
