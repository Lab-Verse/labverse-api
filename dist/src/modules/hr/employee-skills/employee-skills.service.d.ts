import { Repository } from 'typeorm';
import { EmployeeSkill } from './entities/employee-skills.entity';
import { CreateEmployeeSkillDto } from './dto/create-employee-skill.dto';
import { UpdateEmployeeSkillDto } from './dto/update-employee-skill.dto';
import { EmployeeProfile } from '../employees/entities/employee.entity';
import { Skill } from '../skills/entities/skills.entity';
export declare class EmployeeSkillsService {
    private readonly employeeSkillRepository;
    private readonly employeeRepository;
    private readonly skillRepository;
    constructor(employeeSkillRepository: Repository<EmployeeSkill>, employeeRepository: Repository<EmployeeProfile>, skillRepository: Repository<Skill>);
    create(createEmployeeSkillDto: CreateEmployeeSkillDto): Promise<EmployeeSkill>;
    findAll(): Promise<EmployeeSkill[]>;
    findByEmployee(employeeId: string): Promise<EmployeeSkill[]>;
    findOne(employeeId: string, skillId: string): Promise<EmployeeSkill>;
    update(employeeId: string, skillId: string, updateEmployeeSkillDto: UpdateEmployeeSkillDto): Promise<EmployeeSkill>;
    remove(employeeId: string, skillId: string): Promise<void>;
}
