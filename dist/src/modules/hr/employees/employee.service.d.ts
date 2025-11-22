import { Repository } from 'typeorm';
import { EmployeeProfile } from './entities/employee.entity';
import { CreateEmployeeProfileDto } from './dto/create-employee.dto';
import { UpdateEmployeeProfileDto } from './dto/update-employee.dto';
import { User } from '../../users/entities/user.entity';
import { SupabaseService } from '../../../common/services/supabase.service';
export interface ServiceResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    statusCode?: number;
}
export declare class EmployeeProfilesService {
    private readonly employeeProfileRepository;
    private readonly userRepository;
    private readonly supabaseService;
    constructor(employeeProfileRepository: Repository<EmployeeProfile>, userRepository: Repository<User>, supabaseService: SupabaseService);
    create(createEmployeeProfileDto: CreateEmployeeProfileDto, file?: Express.Multer.File): Promise<ServiceResponse<EmployeeProfile>>;
    findAll(): Promise<ServiceResponse<EmployeeProfile[]>>;
    findOne(id: string): Promise<ServiceResponse<EmployeeProfile>>;
    update(id: string, updateEmployeeProfileDto: UpdateEmployeeProfileDto): Promise<ServiceResponse<EmployeeProfile>>;
    remove(id: string): Promise<ServiceResponse>;
    uploadProfileImage(id: string, file: Express.Multer.File): Promise<ServiceResponse<EmployeeProfile>>;
    private handleServiceError;
}
