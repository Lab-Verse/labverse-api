import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TechnologiesService } from './technology.service';
import { TechnologiesController } from './technology.controller';
import { Technology } from './entities/technology.entity';
import { SupabaseService } from 'src/common/services/supabase.service';
import { FileUploadService } from 'src/common/services/file-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Technology]), ConfigModule],
  controllers: [TechnologiesController],
  providers: [TechnologiesService, SupabaseService, FileUploadService],
  exports: [TechnologiesService],
})
export class TechnologiesModule {}
