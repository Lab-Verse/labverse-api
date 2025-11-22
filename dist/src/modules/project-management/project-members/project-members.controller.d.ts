import { ProjectMembersService } from './project-members.service';
import { CreateProjectMemberDto } from './dto/create-project-member.dto';
export declare class ProjectMembersController {
    private readonly projectMembersService;
    constructor(projectMembersService: ProjectMembersService);
    create(dto: CreateProjectMemberDto): Promise<import("./entities/project-member.entity").ProjectMember>;
    findAll(): Promise<import("./entities/project-member.entity").ProjectMember[]>;
    findOne(id: string): Promise<import("./entities/project-member.entity").ProjectMember>;
    update(id: string, dto: Partial<CreateProjectMemberDto>): Promise<import("./entities/project-member.entity").ProjectMember>;
    remove(id: string): Promise<void>;
}
