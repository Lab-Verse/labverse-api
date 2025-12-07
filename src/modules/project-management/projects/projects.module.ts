import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/projects.entity';
import { Client } from '../../crm/client-profile/entities/clients.entity';
import { SupabaseService } from 'src/common/services/supabase.service';
import { FileUploadService } from 'src/common/services/file-upload.service';
import { User } from '../../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User, Client]), ConfigModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, SupabaseService, FileUploadService],
  exports: [ProjectsService, SupabaseService, FileUploadService],
})
export class ProjectsModule {}
