import { ProjectTechnologiesService } from './project-technology.service';
import { CreateProjectTechnologiesDto } from './dto/create-project-technology.dto';
import { UpdateProjectTechnologyDto } from './dto/update-project-technology.dto';
export declare class ProjectTechnologiesController {
    private readonly projectTechnologiesService;
    constructor(projectTechnologiesService: ProjectTechnologiesService);
    create(createProjectTechnologiesDto: CreateProjectTechnologiesDto): Promise<import("./entities/project-technology.entity").ProjectTechnology[]>;
    update(projectId: string, oldTechnologyId: string, dto: UpdateProjectTechnologyDto): Promise<import("./entities/project-technology.entity").ProjectTechnology>;
    findAll(): Promise<import("./entities/project-technology.entity").ProjectTechnology[]>;
    findOne(projectId: string, technologyId: string): Promise<import("./entities/project-technology.entity").ProjectTechnology>;
    remove(projectId: string, technologyId: string): Promise<void>;
}
