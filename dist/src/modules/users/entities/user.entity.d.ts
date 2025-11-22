import { Role } from '../../roles/entities/role.entity';
import { Permission } from '../../permissions/entities/permission.entity';
import { UserPermission } from './user-permission.entity';
import { ClientPlanQuotation } from '../../client-plan-quotations/entities/client-plan-quotation.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    fullName: string;
    roleId: string;
    role: Role;
    userPermissions: UserPermission[];
    permissions: Permission[];
    createdClientPlanQuotations: ClientPlanQuotation[];
    createdAt: Date;
    updatedAt: Date;
}
