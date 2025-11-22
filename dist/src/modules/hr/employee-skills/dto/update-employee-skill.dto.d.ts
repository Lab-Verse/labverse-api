import { CreateEmployeeSkillDto } from './create-employee-skill.dto';
declare const UpdateEmployeeSkillDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateEmployeeSkillDto, "employeeId" | "skillId">>>;
export declare class UpdateEmployeeSkillDto extends UpdateEmployeeSkillDto_base {
}
export {};
