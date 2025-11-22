import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
export declare class SkillsController {
    private readonly skillsService;
    constructor(skillsService: SkillsService);
    create(createSkillDto: CreateSkillDto): Promise<import("./entities/skills.entity").Skill>;
    findAll(): Promise<import("./entities/skills.entity").Skill[]>;
    findOne(id: string): Promise<import("./entities/skills.entity").Skill>;
    update(id: string, updateSkillDto: UpdateSkillDto): Promise<import("./entities/skills.entity").Skill>;
    remove(id: string): Promise<void>;
}
