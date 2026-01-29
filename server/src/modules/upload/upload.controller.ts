import { Controller, Post, Get, Delete, UseInterceptors, UploadedFile, BadRequestException, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Express } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('skill-assets')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    // TODO: Get real user ID from request (e.g., via @User() decorator from AuthGuard)
    // For now, using a placeholder or 'system'
    const mockUserId = 'system-user'; 
    return this.uploadService.saveFileRecord(file, mockUserId);
  }

  @Get('admin/stats')
  @UseGuards(AuthGuard('jwt'))
  async getStats(@Request() req) {
    if (req.user.role?.name !== 'admin') {
      throw new ForbiddenException('Admin access required');
    }
    return this.uploadService.getCleanupStats();
  }

  @Delete('admin/cleanup')
  @UseGuards(AuthGuard('jwt'))
  async cleanup(@Request() req) {
    if (req.user.role?.name !== 'admin') {
      throw new ForbiddenException('Admin access required');
    }
    return this.uploadService.cleanupOrphans();
  }
}
