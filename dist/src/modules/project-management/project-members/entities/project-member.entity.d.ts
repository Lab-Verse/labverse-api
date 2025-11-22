import { Project } from '../../projects/entities/projects.entity';
import { EmployeeProfile } from '../../../hr/employees/entities/employee.entity';
export declare class ProjectMember {
    id: string;
    projectId: string;
    employeeId: string;
    role: string;
    joinedDate: Date;
    leftDate: Date;
    createdAt: Date;
    updatedAt: Date;
    project: Project;
    employee: EmployeeProfile;
}
