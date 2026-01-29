import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { randomUUID } from 'crypto';
import { PrismaModule } from '../prisma/prisma.module';
import * as fs from 'fs';

// Ensure upload directory exists
const uploadDir = './uploads/skills';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
           // Ensure directory exists (redundant but safe)
           if (!fs.existsSync(uploadDir)) {
             fs.mkdirSync(uploadDir, { recursive: true });
           }
           cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const randomName = randomUUID();
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
