import { Repository } from 'typeorm';
import { ProjectUpdate } from './entities/project-update.entity';
import { CreateProjectUpdateDto } from './dto/create-project-update.dto';
export declare class ProjectUpdatesService {
    private readonly projectUpdateRepository;
    constructor(projectUpdateRepository: Repository<ProjectUpdate>);
    create(dto: CreateProjectUpdateDto): Promise<ProjectUpdate>;
    findAll(): Promise<ProjectUpdate[]>;
    findOne(id: string): Promise<ProjectUpdate>;
    update(id: string, dto: Partial<CreateProjectUpdateDto>): Promise<ProjectUpdate>;
    remove(id: string): Promise<void>;
}
