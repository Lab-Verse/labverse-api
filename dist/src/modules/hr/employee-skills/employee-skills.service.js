"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSkillsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_skills_entity_1 = require("./entities/employee-skills.entity");
const employee_entity_1 = require("../employees/entities/employee.entity");
const skills_entity_1 = require("../skills/entities/skills.entity");
const security_util_1 = require("../../../common/utils/security.util");
let EmployeeSkillsService = class EmployeeSkillsService {
    constructor(employeeSkillRepository, employeeRepository, skillRepository) {
        this.employeeSkillRepository = employeeSkillRepository;
        this.employeeRepository = employeeRepository;
        this.skillRepository = skillRepository;
    }
    async create(createEmployeeSkillDto) {
        security_util_1.SecurityUtil.validateObject(createEmployeeSkillDto);
        const { employeeId, skillId } = createEmployeeSkillDto;
        const validEmployeeId = security_util_1.SecurityUtil.validateId(employeeId);
        const validSkillId = security_util_1.SecurityUtil.validateId(skillId);
        const employee = await this.employeeRepository.findOne({
            where: { userId: validEmployeeId },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee profile for user ID "${employeeId}" not found.`);
        }
        const skill = await this.skillRepository.findOne({
            where: { id: validSkillId },
        });
        if (!skill) {
            throw new common_1.NotFoundException(`Skill with ID "${skillId}" not found.`);
        }
        const existingEmployeeSkill = await this.employeeSkillRepository.findOne({
            where: { employeeId: employee.id, skillId: validSkillId },
        });
        if (existingEmployeeSkill) {
            throw new common_1.ConflictException(`Employee already has this skill assigned.`);
        }
        console.log('Creating employee skill with:', {
            employeeId: employee.id,
            skillId,
            proficiencyLevel: createEmployeeSkillDto.proficiencyLevel,
            yearsOfExperience: createEmployeeSkillDto.yearsOfExperience,
        });
        const employeeSkill = this.employeeSkillRepository.create({
            employeeId: employee.id,
            skillId: validSkillId,
            proficiencyLevel: createEmployeeSkillDto.proficiencyLevel,
            yearsOfExperience: createEmployeeSkillDto.yearsOfExperience,
        });
        console.log('Created entity:', employeeSkill);
        return this.employeeSkillRepository.save(employeeSkill);
    }
    async findAll() {
        return this.employeeSkillRepository.find({
            relations: ['employee', 'skill'],
        });
    }
    async findByEmployee(employeeId) {
        const validEmployeeId = security_util_1.SecurityUtil.validateId(employeeId);
        const employee = await this.employeeRepository.findOne({
            where: { id: validEmployeeId },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee profile with ID "${employeeId}" not found.`);
        }
        return this.employeeSkillRepository.find({
            where: { employeeId: validEmployeeId },
            relations: ['skill'],
        });
    }
    async findOne(employeeId, skillId) {
        const validEmployeeId = security_util_1.SecurityUtil.validateId(employeeId);
        const validSkillId = security_util_1.SecurityUtil.validateId(skillId);
        const employeeSkill = await this.employeeSkillRepository.findOne({
            where: { employeeId: validEmployeeId, skillId: validSkillId },
            relations: ['employee', 'skill'],
        });
        if (!employeeSkill) {
            throw new common_1.NotFoundException(`EmployeeSkill not found.`);
        }
        return employeeSkill;
    }
    async update(employeeId, skillId, updateEmployeeSkillDto) {
        security_util_1.SecurityUtil.validateObject(updateEmployeeSkillDto);
        const employeeSkill = await this.findOne(employeeId, skillId);
        Object.assign(employeeSkill, updateEmployeeSkillDto);
        return this.employeeSkillRepository.save(employeeSkill);
    }
    async remove(employeeId, skillId) {
        const validEmployeeId = security_util_1.SecurityUtil.validateId(employeeId);
        const validSkillId = security_util_1.SecurityUtil.validateId(skillId);
        const result = await this.employeeSkillRepository.delete({
            employeeId: validEmployeeId,
            skillId: validSkillId,
        });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`EmployeeSkill not found.`);
        }
    }
};
exports.EmployeeSkillsService = EmployeeSkillsService;
exports.EmployeeSkillsService = EmployeeSkillsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_skills_entity_1.EmployeeSkill)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.EmployeeProfile)),
    __param(2, (0, typeorm_1.InjectRepository)(skills_entity_1.Skill)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EmployeeSkillsService);
//# sourceMappingURL=employee-skills.service.js.map