import { Repository } from 'typeorm';
import { ProjectTechnology } from './entities/project-technology.entity';
import { CreateProjectTechnologiesDto } from './dto/create-project-technology.dto';
import { Project } from '../projects/entities/projects.entity';
import { Technology } from '../../technology/entities/technology.entity';
import { DataSource } from 'typeorm';
import { UpdateProjectTechnologyDto } from './dto/update-project-technology.dto';
export declare class ProjectTechnologiesService {
    private readonly projectTechnologyRepository;
    private readonly projectRepository;
    private readonly technologyRepository;
    private dataSource;
    constructor(projectTechnologyRepository: Repository<ProjectTechnology>, projectRepository: Repository<Project>, technologyRepository: Repository<Technology>, dataSource: DataSource);
    create(dto: CreateProjectTechnologiesDto): Promise<ProjectTechnology[]>;
    update(projectId: string, oldTechnologyId: string, dto: UpdateProjectTechnologyDto): Promise<ProjectTechnology>;
    findAll(): Promise<ProjectTechnology[]>;
    findOne(projectId: string, technologyId: string): Promise<ProjectTechnology>;
    remove(projectId: string, technologyId: string): Promise<void>;
}
