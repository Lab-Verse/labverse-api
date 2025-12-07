import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EmployeeProfilesService } from './employee.service';
import { EmployeeProfilesController } from './employee.controller';
import { EmployeeProfile } from './entities/employee.entity';
import { User } from '../../users/entities/user.entity';
import { SupabaseService } from 'src/common/services/supabase.service';
import { FileUploadService } from 'src/common/services/file-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeProfile, User]), ConfigModule],
  controllers: [EmployeeProfilesController],
  providers: [EmployeeProfilesService, SupabaseService, FileUploadService],
  exports: [EmployeeProfilesService, SupabaseService, FileUploadService],
})
export class EmployeeProfilesModule {}
