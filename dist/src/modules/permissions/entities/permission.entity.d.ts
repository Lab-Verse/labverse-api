import { RolePermission } from '../../role-permissions/entities/role-permission.entity';
import { UserPermission } from '../../users/entities/user-permission.entity';
import { Role } from '../../roles/entities/role.entity';
import { User } from '../../users/entities/user.entity';
export declare class Permission {
    id: string;
    name: string;
    description: string;
    resource: string;
    action: string;
    rolePermissions: RolePermission[];
    userPermissions: UserPermission[];
    roles: Role[];
    users: User[];
    createdAt: Date;
    updatedAt: Date;
}
