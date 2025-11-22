import { EmployeeStatus } from './employee-status.enum';
export declare class CreateEmployeeProfileDto {
    userId: string;
    hireDate?: Date;
    jobTitle?: string;
    department?: string;
    status?: EmployeeStatus;
    file?: any;
}
