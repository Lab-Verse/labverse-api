import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { RolePermission } from '../role-permissions/entities/role-permission.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ServiceResponse } from '../../common/interfaces/service-response.interface';
export declare class RolesService {
    private roleRepository;
    private permissionRepository;
    private rolePermissionRepository;
    constructor(roleRepository: Repository<Role>, permissionRepository: Repository<Permission>, rolePermissionRepository: Repository<RolePermission>);
    create(dto: CreateRoleDto): Promise<ServiceResponse<Role>>;
    findOneWithPermissions(id: string): Promise<Role>;
    findAll(): Promise<ServiceResponse<Role[]>>;
    findOne(id: string): Promise<ServiceResponse<Role>>;
    update(id: string, dto: UpdateRoleDto): Promise<ServiceResponse<Role>>;
    remove(id: string): Promise<ServiceResponse<void>>;
}
