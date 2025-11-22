import { Repository } from 'typeorm';
import { RolePermission } from './entities/role-permission.entity';
import { AssignRolePermissionsDto } from './dto/assign-role-permissions.dto';
import { Role } from '../roles/entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
export declare class RolePermissionsService {
    private readonly rolePermissionRepo;
    private readonly roleRepo;
    private readonly permissionRepo;
    constructor(rolePermissionRepo: Repository<RolePermission>, roleRepo: Repository<Role>, permissionRepo: Repository<Permission>);
    assignPermissions(roleId: string, dto: AssignRolePermissionsDto): Promise<RolePermission[]>;
    getPermissionsByRole(roleId: string): Promise<Permission[]>;
    removePermission(roleId: string, permissionId: string): Promise<RolePermission>;
}
