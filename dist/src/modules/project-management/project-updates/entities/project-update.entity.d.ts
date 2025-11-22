import { Project } from '../../projects/entities/projects.entity';
import { EmployeeProfile } from '../../../hr/employees/entities/employee.entity';
export declare class ProjectUpdate {
    id: string;
    projectId: string;
    updatedBy: string;
    title: string;
    description: string;
    updateDate: Date;
    createdAt: Date;
    updatedAt: Date;
    project: Project;
    updatedByEmployee: EmployeeProfile;
}
