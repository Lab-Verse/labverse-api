import { Repository, DataSource } from 'typeorm';
import { CreateProjectDto } from './dto/create-projects.dto';
import { UpdateProjectDto } from './dto/update-projects.dto';
import { Project } from './entities/projects.entity';
import { Client } from '../../crm/clients/entities/clients.entity';
import { User } from '../../users/entities/user.entity';
import { SupabaseService } from '../../../common/services/supabase.service';
export declare class ProjectsService {
    private readonly projectRepository;
    private readonly clientRepository;
    private readonly userRepository;
    private readonly dataSource;
    private readonly supabaseService;
    constructor(projectRepository: Repository<Project>, clientRepository: Repository<Client>, userRepository: Repository<User>, dataSource: DataSource, supabaseService: SupabaseService);
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    findAll(): Promise<Project[]>;
    findOne(id: string): Promise<Project>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
