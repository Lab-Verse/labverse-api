import { Project } from '../../projects/entities/projects.entity';
import { Technology } from '../../../technology/entities/technology.entity';
export declare class ProjectTechnology {
    projectId: string;
    technologyId: string;
    project: Project;
    technology: Technology;
    createdAt: Date;
    updatedAt: Date;
}
