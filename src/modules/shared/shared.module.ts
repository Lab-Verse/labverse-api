import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';
// import { Permission } from '../roles/entities/permission.entity';
// import { RolePermission } from '../roles/entities/role-permission.entity';
// import { UserPermission } from '../users/entities/user-permission.entity';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { FileUploadService } from '../../common/services/file-upload.service';
import { StorageService } from '../../common/services/storage.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      User,
      Role,
      // Permission,
      // RolePermission,
      // UserPermission,
    ]),
  ],
  providers: [PermissionsGuard, RolesGuard, FileUploadService, StorageService],
  exports: [TypeOrmModule, PermissionsGuard, RolesGuard, FileUploadService, StorageService],
})
export class SharedModule {}
