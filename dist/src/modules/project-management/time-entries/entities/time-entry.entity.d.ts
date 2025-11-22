import { Project } from '../../projects/entities/projects.entity';
import { EmployeeProfile } from '../../../hr/employees/entities/employee.entity';
import { Task } from '../../tasks/entities/task.entity';
export declare class TimeEntry {
    id: string;
    projectId: string;
    employeeId: string;
    taskId: string;
    hoursWorked: number;
    workDate: Date;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    project: Project;
    employee: EmployeeProfile;
    task: Task;
}
