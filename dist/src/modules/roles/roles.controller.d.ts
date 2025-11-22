import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(dto: CreateRoleDto): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<import("./entities/role.entity").Role>>;
    findAll(): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<import("./entities/role.entity").Role[]>>;
    findOne(id: string): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<import("./entities/role.entity").Role>>;
    update(id: string, dto: UpdateRoleDto): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<import("./entities/role.entity").Role>>;
    remove(id: string): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<void>>;
}
