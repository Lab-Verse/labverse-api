import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserWithPermissionsDto } from './dto/create-user-with-permissions.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AssignPermissionsDto } from './dto/assign-permissions.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<import("./entities/user.entity").User>>;
    createWithPermissions(dto: CreateUserWithPermissionsDto): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<import("./entities/user.entity").User>>;
    assignPermissions(id: string, dto: AssignPermissionsDto): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<import("./entities/user.entity").User>>;
    getUserPermissions(id: string): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<import("../permissions/entities/permission.entity").Permission[]>>;
    getAvailableFeatures(): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<{
        feature: string;
        actions: string[];
    }[]>>;
    getAvailableActionsForFeature(feature: string): Promise<string[]>;
    findAll(): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<import("./entities/user.entity").User[]>>;
    findOne(id: string): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<import("./entities/user.entity").User>>;
    update(id: string, dto: UpdateUserDto): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<import("./entities/user.entity").User>>;
    remove(id: string): Promise<import("../../common/interfaces/service-response.interface").ServiceResponse<void>>;
}
