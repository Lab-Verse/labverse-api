"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployeeSkillDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_employee_skill_dto_1 = require("./create-employee-skill.dto");
class UpdateEmployeeSkillDto extends (0, mapped_types_1.PartialType)((0, mapped_types_1.OmitType)(create_employee_skill_dto_1.CreateEmployeeSkillDto, ['employeeId', 'skillId'])) {
}
exports.UpdateEmployeeSkillDto = UpdateEmployeeSkillDto;
//# sourceMappingURL=update-employee-skill.dto.js.map