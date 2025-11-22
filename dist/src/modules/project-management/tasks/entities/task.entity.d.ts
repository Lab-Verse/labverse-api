import { Project } from '../../projects/entities/projects.entity';
import { ProjectMilestone } from '../../project-milestones/entities/project-milestone.entity';
import { EmployeeProfile } from '../../../hr/employees/entities/employee.entity';
import { TaskComment } from './task-comment.entity';
export declare class Task {
    id: string;
    name: string;
    description: string;
    status: string;
    priority: string;
    due_date: Date;
    project: Project;
    project_milestone: ProjectMilestone;
    created_by_employee_profile: EmployeeProfile;
    assigned_to_employee_profile: EmployeeProfile;
    comments: TaskComment[];
    created_at: Date;
    updated_at: Date;
}
