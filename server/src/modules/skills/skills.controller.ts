import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, Request, ForbiddenException, Query } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto, CreateCommentDto, CreateRatingDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new skill' })
  create(@Body() createSkillDto: CreateSkillDto, @Request() req) {
    // req.user is populated by JwtAuthGuard (which uses JwtStrategy)
    // The payload usually contains 'sub' (id) and 'email'
    // Ensure jwt.strategy.ts maps 'sub' to 'id' or use 'sub' directly
    // Looking at auth.service.ts login method: payload = { email: user.email, sub: user.id, ... }
    // JwtStrategy usually validates and returns payload or user object. 
    // If it returns payload, req.user.userId might be under 'sub' or 'userId' depending on validate implementation.
    // Let's assume req.user has 'userId' or 'id'.
    // Looking at auth.service.ts, login returns { access_token, user }. 
    // JwtStrategy usually extracts from token.
    // If JwtStrategy returns { userId: payload.sub, ... }, then req.user.userId.
    // I'll check jwt.strategy.ts later if needed, but usually req.user.userId or req.user.id.
    // Based on standard NestJS patterns: req.user.userId (from payload.sub)
    // Let's assume req.user.userId is available. If not, I'll debug.
    // Actually, in auth.controller.ts, getProfile returns req.user.
    // If I check auth.service.ts login: payload = { sub: user.id ... }
    // JwtStrategy validate(payload) { return { userId: payload.sub, username: payload.username }; } (Common pattern)
    // Or return payload directly.
    
    // I will assume req.user.userId based on common practice, or req.user.id.
    // Let's check jwt.strategy.ts.
    
    return this.skillsService.create(createSkillDto, req.user.userId || req.user.id || req.user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'Get all skills' })
  findAll() {
    return this.skillsService.findAll();
  }

  @Get('admin/list')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all skills for admin (with status filter)' })
  @ApiQuery({ name: 'status', required: false })
  findAllAdmin(@Request() req, @Query('status') status?: string) {
    // Check if user is admin
    const user = req.user;
    if (user.role?.name !== 'admin') {
      throw new ForbiddenException('Admin access required');
    }
    return this.skillsService.findAllAdmin(status);
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update skill status (Admin only)' })
  updateStatus(@Param('id') id: string, @Body() body: { status: string }, @Request() req) {
    const user = req.user;
    if (user.role?.name !== 'admin') {
      throw new ForbiddenException('Admin access required');
    }
    return this.skillsService.updateStatus(id, body.status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get skill details' })
  async findOne(@Param('id') id: string) {
    const skill = await this.skillsService.findOne(id);
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return skill;
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a skill' })
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto, @Request() req) {
    return this.skillsService.update(id, updateSkillDto, req.user.userId || req.user.id || req.user.sub);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a skill (Soft delete)' })
  remove(@Param('id') id: string, @Request() req) {
    return this.skillsService.remove(id, req.user.userId || req.user.id || req.user.sub);
  }

  @Delete(':id/hard')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hard delete a skill (Admin only)' })
  hardDelete(@Param('id') id: string, @Request() req) {
    const user = req.user;
    if (user.role?.name !== 'admin') {
      throw new ForbiddenException('Admin access required');
    }
    return this.skillsService.hardDelete(id);
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get skills by user' })
  findByUser(@Param('userId') userId: string, @Request() req) {
    const currentUserId = req.user.userId || req.user.id || req.user.sub;
    return this.skillsService.findByUser(userId, currentUserId);
  }

  @Post(':id/comments')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a comment to a skill' })
  addComment(@Param('id') id: string, @Body() createCommentDto: CreateCommentDto, @Request() req) {
    return this.skillsService.addComment(id, req.user.userId || req.user.id || req.user.sub, createCommentDto);
  }

  @Post(':id/ratings')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Rate a skill' })
  addRating(@Param('id') id: string, @Body() createRatingDto: CreateRatingDto, @Request() req) {
    return this.skillsService.addRating(id, req.user.userId || req.user.id || req.user.sub, createRatingDto);
  }
}
