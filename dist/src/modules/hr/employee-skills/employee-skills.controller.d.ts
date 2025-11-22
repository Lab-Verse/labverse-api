import { EmployeeSkillsService } from './employee-skills.service';
import { CreateEmployeeSkillDto } from './dto/create-employee-skill.dto';
import { UpdateEmployeeSkillDto } from './dto/update-employee-skill.dto';
export declare class EmployeeSkillsController {
    private readonly employeeSkillsService;
    constructor(employeeSkillsService: EmployeeSkillsService);
    create(createEmployeeSkillDto: CreateEmployeeSkillDto): Promise<import("./entities/employee-skills.entity").EmployeeSkill>;
    findAll(): Promise<import("./entities/employee-skills.entity").EmployeeSkill[]>;
    findByEmployee(employeeId: string): Promise<import("./entities/employee-skills.entity").EmployeeSkill[]>;
    findOne(employeeId: string, skillId: string): Promise<import("./entities/employee-skills.entity").EmployeeSkill>;
    update(employeeId: string, skillId: string, updateEmployeeSkillDto: UpdateEmployeeSkillDto): Promise<import("./entities/employee-skills.entity").EmployeeSkill>;
    remove(employeeId: string, skillId: string): Promise<void>;
}
