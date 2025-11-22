import { User } from './user.entity';
import { Permission } from '../../../modules/permissions/entities/permission.entity';
export declare class UserPermission {
    id: string;
    userId: string;
    permissionId: string;
    user: User;
    permission: Permission;
    createdAt: Date;
}
