import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ServiceResponse } from '../../common/interfaces/service-response.interface';
export declare class PermissionsService {
    private permissionRepository;
    constructor(permissionRepository: Repository<Permission>);
    create(dto: CreatePermissionDto): Promise<ServiceResponse<Permission>>;
    findAll(): Promise<ServiceResponse<Permission[]>>;
    findByResource(resource: string): Promise<ServiceResponse<Permission[]>>;
    findOne(id: string): Promise<ServiceResponse<Permission>>;
    update(id: string, dto: UpdatePermissionDto): Promise<ServiceResponse<Permission>>;
    remove(id: string): Promise<ServiceResponse<void>>;
    getAllResources(): Promise<ServiceResponse<string[]>>;
    getAllActions(): Promise<ServiceResponse<string[]>>;
}
