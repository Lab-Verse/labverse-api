import { ProjectsService } from './projects.service';
import { SupabaseService } from 'src/common/services/supabase.service';
import { UpdateProjectDto } from './dto/update-projects.dto';
export declare class ProjectsController {
    private readonly projectsService;
    private readonly supabaseService;
    private readonly logger;
    constructor(projectsService: ProjectsService, supabaseService: SupabaseService);
    create(body: any, files?: Express.Multer.File[]): Promise<import("./entities/projects.entity").Project>;
    findAll(): Promise<import("./entities/projects.entity").Project[]>;
    findOne(id: string): Promise<import("./entities/projects.entity").Project>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<import("./entities/projects.entity").Project>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
