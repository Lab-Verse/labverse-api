import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    create(dto: CreatePermissionDto): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<import("./entities/permission.entity").Permission>>;
    findAll(): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<import("./entities/permission.entity").Permission[]>>;
    getAllResources(): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<string[]>>;
    getAllActions(): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<string[]>>;
    findByResource(resource: string): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<import("./entities/permission.entity").Permission[]>>;
    findOne(id: string): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<import("./entities/permission.entity").Permission>>;
    update(id: string, dto: UpdatePermissionDto): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<import("./entities/permission.entity").Permission>>;
    remove(id: string): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<void>>;
}
