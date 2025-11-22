import { EmployeeProfilesService } from './employee.service';
import { CreateEmployeeProfileDto } from './dto/create-employee.dto';
import { UpdateEmployeeProfileDto } from './dto/update-employee.dto';
export declare class EmployeeProfilesController {
    private readonly employeeProfilesService;
    constructor(employeeProfilesService: EmployeeProfilesService);
    create(createEmployeeProfileDto: CreateEmployeeProfileDto, file: Express.Multer.File): Promise<import("./employee.service").ServiceResponse<import("./entities/employee.entity").EmployeeProfile>>;
    findAll(): Promise<import("./employee.service").ServiceResponse<import("./entities/employee.entity").EmployeeProfile[]>>;
    findOne(id: string): Promise<import("./employee.service").ServiceResponse<import("./entities/employee.entity").EmployeeProfile>>;
    update(id: string, updateEmployeeProfileDto: UpdateEmployeeProfileDto): Promise<import("./employee.service").ServiceResponse<import("./entities/employee.entity").EmployeeProfile>>;
    remove(id: string): Promise<import("./employee.service").ServiceResponse<any>>;
    uploadProfileImage(id: string, file: Express.Multer.File): Promise<import("./employee.service").ServiceResponse<import("./entities/employee.entity").EmployeeProfile>>;
}
