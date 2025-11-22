"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSkillsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_skills_entity_1 = require("./entities/employee-skills.entity");
const employee_skills_controller_1 = require("./employee-skills.controller");
const employee_skills_service_1 = require("./employee-skills.service");
const employee_entity_1 = require("../employees/entities/employee.entity");
const skills_entity_1 = require("../skills/entities/skills.entity");
let EmployeeSkillsModule = class EmployeeSkillsModule {
};
exports.EmployeeSkillsModule = EmployeeSkillsModule;
exports.EmployeeSkillsModule = EmployeeSkillsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employee_skills_entity_1.EmployeeSkill, employee_entity_1.EmployeeProfile, skills_entity_1.Skill])],
        controllers: [employee_skills_controller_1.EmployeeSkillsController],
        providers: [employee_skills_service_1.EmployeeSkillsService],
        exports: [typeorm_1.TypeOrmModule, employee_skills_service_1.EmployeeSkillsService],
    })
], EmployeeSkillsModule);
//# sourceMappingURL=employee-skills.module.js.map