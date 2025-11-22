import { Repository } from 'typeorm';
import { ProjectMilestone } from './entities/project-milestone.entity';
import { CreateProjectMilestoneDto } from './dto/create-project-milestone.dto';
import { UpdateProjectMilestoneDto } from './dto/update-project-milestone.dto';
export declare class ProjectMilestoneService {
    private milestoneRepo;
    constructor(milestoneRepo: Repository<ProjectMilestone>);
    create(dto: CreateProjectMilestoneDto): Promise<ProjectMilestone>;
    findAll(): Promise<ProjectMilestone[]>;
    findOne(id: string): Promise<ProjectMilestone>;
    update(id: string, dto: UpdateProjectMilestoneDto): Promise<ProjectMilestone>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
