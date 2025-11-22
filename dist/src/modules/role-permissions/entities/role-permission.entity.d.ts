import { Role } from '../../roles/entities/role.entity';
import { Permission } from '../../../modules/permissions/entities/permission.entity';
export declare class RolePermission {
    id: string;
    roleId: string;
    permissionId: string;
    role: Role;
    permission: Permission;
    createdAt: Date;
}
