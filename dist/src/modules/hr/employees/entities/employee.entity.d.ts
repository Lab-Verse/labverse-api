import { User } from '../../../users/entities/user.entity';
import { EmployeeStatus } from '../dto/employee-status.enum';
export declare class EmployeeProfile {
    id: string;
    userId: string;
    user: User;
    employeeCode: string;
    hireDate: Date;
    jobTitle: string;
    department: string;
    profileImage: string;
    status: EmployeeStatus;
    createdAt: Date;
    updatedAt: Date;
    generateEmployeeCode(): void;
}
