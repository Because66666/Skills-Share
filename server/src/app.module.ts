import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { SkillsModule } from './modules/skills/skills.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    RolesModule,
    TenantsModule,
    SkillsModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

