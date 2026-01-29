"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, prisma) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findOne(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async login(user) {
        var _a;
        const payload = { email: user.email, sub: user.id, role: (_a = user.role) === null || _a === void 0 ? void 0 : _a.name };
        return {
            access_token: this.jwtService.sign(payload),
            user: user,
        };
    }
    async register(createUserDto) {
        const existingUser = await this.usersService.findOne(createUserDto.email);
        if (existingUser) {
            throw new common_1.BadRequestException('用户已存在');
        }
        let roleId = createUserDto.roleId;
        let tenantId = createUserDto.tenantId;
        if (!roleId) {
            const userRole = await this.prisma.role.findUnique({ where: { name: 'user' } });
            roleId = userRole === null || userRole === void 0 ? void 0 : userRole.id;
        }
        if (!tenantId) {
            const defaultTenant = await this.prisma.tenant.findUnique({ where: { code: 'default_org' } });
            tenantId = defaultTenant === null || defaultTenant === void 0 ? void 0 : defaultTenant.id;
        }
        const newUser = await this.usersService.create(Object.assign(Object.assign({}, createUserDto), { roleId,
            tenantId }));
        return this.login(newUser);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map