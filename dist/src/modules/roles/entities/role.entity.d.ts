import { User } from '../../users/entities/user.entity';
import { RolePermission } from '../../role-permissions/entities/role-permission.entity';
import { Permission } from '../../../modules/permissions/entities/permission.entity';
export declare class Role {
    id: string;
    name: string;
    description: string;
    users: User[];
    rolePermissions: RolePermission[];
    permissions: Permission[];
    createdAt: Date;
    updatedAt: Date;
}
