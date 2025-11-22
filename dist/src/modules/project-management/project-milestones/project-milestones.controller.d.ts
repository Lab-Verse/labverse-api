import { ProjectMilestoneService } from './project-milestones.service';
import { CreateProjectMilestoneDto } from './dto/create-project-milestone.dto';
import { UpdateProjectMilestoneDto } from './dto/update-project-milestone.dto';
export declare class ProjectMilestoneController {
    private readonly milestoneService;
    constructor(milestoneService: ProjectMilestoneService);
    create(dto: CreateProjectMilestoneDto): Promise<import("./entities/project-milestone.entity").ProjectMilestone>;
    findAll(): Promise<import("./entities/project-milestone.entity").ProjectMilestone[]>;
    findOne(id: string): Promise<import("./entities/project-milestone.entity").ProjectMilestone>;
    update(id: string, dto: UpdateProjectMilestoneDto): Promise<import("./entities/project-milestone.entity").ProjectMilestone>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
