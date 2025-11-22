import { ProjectStatus } from './project-status.enum';
import { UUID } from 'crypto';
export declare class CreateProjectDto {
    name: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    status?: ProjectStatus;
    budget?: number;
    clientId: UUID;
    images?: string[];
}
