import { Project } from '../../projects/entities/projects.entity';
import { Task } from '../../tasks/entities/task.entity';
export declare class ProjectMilestone {
    id: string;
    project: Project;
    name: string;
    description: string;
    due_date: Date;
    status: string;
    tasks: Task[];
    created_at: Date;
    updated_at: Date;
}
