import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { UserPermission } from './entities/user-permission.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserWithPermissionsDto } from './dto/create-user-with-permissions.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AssignPermissionsDto } from './dto/assign-permissions.dto';
import { ServiceResponse } from '../../common/interfaces/service-response.interface';
export declare class UsersService {
    private userRepository;
    private roleRepository;
    private permissionRepository;
    private userPermissionRepository;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Role>, permissionRepository: Repository<Permission>, userPermissionRepository: Repository<UserPermission>);
    create(dto: CreateUserDto): Promise<ServiceResponse<User>>;
    findByEmail(email: string, options?: {
        includePassword?: boolean;
    }): Promise<User | null>;
    updatePassword(userId: string, hashedPassword: string): Promise<void>;
    createWithPermissions(dto: CreateUserWithPermissionsDto): Promise<ServiceResponse<User>>;
    assignPermissions(userId: string, dto: AssignPermissionsDto): Promise<ServiceResponse<User>>;
    private addUserPermissions;
    private removeUserPermissions;
    private replaceUserFeaturePermissions;
    getAvailableActionsForFeature(feature: string): Promise<string[]>;
    getAvailableFeatures(): Promise<ServiceResponse<{
        feature: string;
        actions: string[];
    }[]>>;
    findOneWithPermissions(id: string): Promise<User>;
    findById(id: string): Promise<User | null>;
    getUserPermissions(userId: string): Promise<ServiceResponse<Permission[]>>;
    findAll(): Promise<ServiceResponse<User[]>>;
    findOne(id: string): Promise<ServiceResponse<User>>;
    update(id: string, dto: UpdateUserDto): Promise<ServiceResponse<User>>;
    remove(id: string): Promise<ServiceResponse<void>>;
}
