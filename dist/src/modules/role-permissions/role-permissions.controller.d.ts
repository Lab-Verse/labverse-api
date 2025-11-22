import { RolePermissionsService } from './role-permissions.service';
import { AssignRolePermissionsDto } from './dto/assign-role-permissions.dto';
export declare class RolePermissionsController {
    private readonly rolePermissionsService;
    constructor(rolePermissionsService: RolePermissionsService);
    assignPermissions(roleId: string, dto: AssignRolePermissionsDto): Promise<import("./entities/role-permission.entity").RolePermission[]>;
    getPermissions(roleId: string): Promise<import("../permissions/entities/permission.entity").Permission[]>;
    removePermission(roleId: string, permissionId: string): Promise<import("./entities/role-permission.entity").RolePermission>;
}
