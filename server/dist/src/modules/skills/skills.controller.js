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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillsController = void 0;
const common_1 = require("@nestjs/common");
const skills_service_1 = require("./skills.service");
const create_skill_dto_1 = require("./dto/create-skill.dto");
const update_skill_dto_1 = require("./dto/update-skill.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let SkillsController = class SkillsController {
    constructor(skillsService) {
        this.skillsService = skillsService;
    }
    create(createSkillDto, req) {
        return this.skillsService.create(createSkillDto, req.user.userId || req.user.id || req.user.sub);
    }
    findAll() {
        return this.skillsService.findAll();
    }
    findAllAdmin(req, status) {
        var _a;
        const user = req.user;
        if (((_a = user.role) === null || _a === void 0 ? void 0 : _a.name) !== 'admin') {
            throw new common_1.ForbiddenException('Admin access required');
        }
        return this.skillsService.findAllAdmin(status);
    }
    updateStatus(id, body, req) {
        var _a;
        const user = req.user;
        if (((_a = user.role) === null || _a === void 0 ? void 0 : _a.name) !== 'admin') {
            throw new common_1.ForbiddenException('Admin access required');
        }
        return this.skillsService.updateStatus(id, body.status);
    }
    async findOne(id) {
        const skill = await this.skillsService.findOne(id);
        if (!skill) {
            throw new common_1.NotFoundException(`Skill with ID ${id} not found`);
        }
        return skill;
    }
    update(id, updateSkillDto, req) {
        return this.skillsService.update(id, updateSkillDto, req.user.userId || req.user.id || req.user.sub);
    }
    remove(id, req) {
        return this.skillsService.remove(id, req.user.userId || req.user.id || req.user.sub);
    }
    hardDelete(id, req) {
        var _a;
        const user = req.user;
        if (((_a = user.role) === null || _a === void 0 ? void 0 : _a.name) !== 'admin') {
            throw new common_1.ForbiddenException('Admin access required');
        }
        return this.skillsService.hardDelete(id);
    }
    findByUser(userId, req) {
        const currentUserId = req.user.userId || req.user.id || req.user.sub;
        return this.skillsService.findByUser(userId, currentUserId);
    }
    addComment(id, createCommentDto, req) {
        return this.skillsService.addComment(id, req.user.userId || req.user.id || req.user.sub, createCommentDto);
    }
    addRating(id, createRatingDto, req) {
        return this.skillsService.addRating(id, req.user.userId || req.user.id || req.user.sub, createRatingDto);
    }
};
exports.SkillsController = SkillsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new skill' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_skill_dto_1.CreateSkillDto, Object]),
    __metadata("design:returntype", void 0)
], SkillsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all skills' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SkillsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('admin/list'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all skills for admin (with status filter)' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SkillsController.prototype, "findAllAdmin", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update skill status (Admin only)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], SkillsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get skill details' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SkillsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a skill' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_skill_dto_1.UpdateSkillDto, Object]),
    __metadata("design:returntype", void 0)
], SkillsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a skill (Soft delete)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SkillsController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':id/hard'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Hard delete a skill (Admin only)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SkillsController.prototype, "hardDelete", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get skills by user' }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SkillsController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Post)(':id/comments'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add a comment to a skill' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_skill_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", void 0)
], SkillsController.prototype, "addComment", null);
__decorate([
    (0, common_1.Post)(':id/ratings'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Rate a skill' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_skill_dto_1.CreateRatingDto, Object]),
    __metadata("design:returntype", void 0)
], SkillsController.prototype, "addRating", null);
exports.SkillsController = SkillsController = __decorate([
    (0, swagger_1.ApiTags)('skills'),
    (0, common_1.Controller)('skills'),
    __metadata("design:paramtypes", [skills_service_1.SkillsService])
], SkillsController);
//# sourceMappingURL=skills.controller.js.map