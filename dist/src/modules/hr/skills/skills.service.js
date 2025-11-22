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
exports.SkillsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const skills_entity_1 = require("./entities/skills.entity");
const security_util_1 = require("../../../common/utils/security.util");
let SkillsService = class SkillsService {
    constructor(skillRepository) {
        this.skillRepository = skillRepository;
    }
    async create(createSkillDto) {
        security_util_1.SecurityUtil.validateObject(createSkillDto);
        const existingSkill = await this.skillRepository.findOne({
            where: { name: createSkillDto.name },
        });
        if (existingSkill) {
            throw new common_1.ConflictException(`Skill with name "${createSkillDto.name}" already exists.`);
        }
        const skill = this.skillRepository.create(createSkillDto);
        return this.skillRepository.save(skill);
    }
    async findAll() {
        return this.skillRepository.find();
    }
    async findOne(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const skill = await this.skillRepository.findOne({
            where: { id: validId },
        });
        if (!skill) {
            throw new common_1.NotFoundException(`Skill with ID "${validId}" not found.`);
        }
        return skill;
    }
    async update(id, updateSkillDto) {
        security_util_1.SecurityUtil.validateObject(updateSkillDto);
        const validId = security_util_1.SecurityUtil.validateId(id);
        const skill = await this.findOne(validId);
        if (updateSkillDto.name && updateSkillDto.name !== skill.name) {
            const existingSkill = await this.skillRepository.findOne({
                where: { name: updateSkillDto.name },
            });
            if (existingSkill && existingSkill.id !== validId) {
                throw new common_1.ConflictException(`Skill with name "${updateSkillDto.name}" already exists.`);
            }
        }
        Object.assign(skill, updateSkillDto);
        return this.skillRepository.save(skill);
    }
    async remove(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const result = await this.skillRepository.delete(validId);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Skill with ID "${validId}" not found.`);
        }
    }
};
exports.SkillsService = SkillsService;
exports.SkillsService = SkillsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(skills_entity_1.Skill)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SkillsService);
//# sourceMappingURL=skills.service.js.map