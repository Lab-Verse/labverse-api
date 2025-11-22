import { EmployeeProfile } from '../../employees/entities/employee.entity';
import { Skill } from '../../skills/entities/skills.entity';
export declare class EmployeeSkill {
    id: string;
    employeeId: string;
    skillId: string;
    proficiencyLevel: number;
    yearsOfExperience: number;
    createdAt: Date;
    updatedAt: Date;
    employee: EmployeeProfile;
    skill: Skill;
}
