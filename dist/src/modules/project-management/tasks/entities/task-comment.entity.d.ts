import { Task } from '../../tasks/entities/task.entity';
import { EmployeeProfile } from '../../../hr/employees/entities/employee.entity';
export declare class TaskComment {
    id: string;
    comment_text: string;
    task: Task;
    commented_by_employee_profile: EmployeeProfile;
    created_at: Date;
    updated_at: Date;
}
