import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Client } from './entities/clients.entity';
import { SupabaseService } from 'src/common/services/supabase.service';
import { FileUploadService } from 'src/common/services/file-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), ConfigModule],
  controllers: [ClientsController],
  providers: [ClientsService, SupabaseService, FileUploadService],
  exports: [ClientsService, TypeOrmModule, SupabaseService, FileUploadService], // Export for other modules that might need to inject ClientsService or use Client entity
})
export class ClientsModule {}
