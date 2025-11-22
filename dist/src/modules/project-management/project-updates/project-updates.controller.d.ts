import { ProjectUpdatesService } from './project-updates.service';
import { CreateProjectUpdateDto } from './dto/create-project-update.dto';
export declare class ProjectUpdatesController {
    private readonly projectUpdatesService;
    constructor(projectUpdatesService: ProjectUpdatesService);
    create(dto: CreateProjectUpdateDto): Promise<import("./entities/project-update.entity").ProjectUpdate>;
    findAll(): Promise<import("./entities/project-update.entity").ProjectUpdate[]>;
    findOne(id: string): Promise<import("./entities/project-update.entity").ProjectUpdate>;
    update(id: string, dto: Partial<CreateProjectUpdateDto>): Promise<import("./entities/project-update.entity").ProjectUpdate>;
    remove(id: string): Promise<void>;
}
