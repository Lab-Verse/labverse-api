import { Repository } from 'typeorm';
import { ProjectMember } from './entities/project-member.entity';
import { CreateProjectMemberDto } from './dto/create-project-member.dto';
export declare class ProjectMembersService {
    private readonly projectMemberRepository;
    constructor(projectMemberRepository: Repository<ProjectMember>);
    create(dto: CreateProjectMemberDto): Promise<ProjectMember>;
    findAll(): Promise<ProjectMember[]>;
    findOne(id: string): Promise<ProjectMember>;
    update(id: string, dto: Partial<CreateProjectMemberDto>): Promise<ProjectMember>;
    remove(id: string): Promise<void>;
}
