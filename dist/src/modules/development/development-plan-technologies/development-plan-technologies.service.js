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
exports.DevelopmentPlanTechnologiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const development_plan_technology_entity_1 = require("./entities/development-plan-technology.entity");
const security_util_1 = require("../../../common/utils/security.util");
let DevelopmentPlanTechnologiesService = class DevelopmentPlanTechnologiesService {
    constructor(dptRepository) {
        this.dptRepository = dptRepository;
    }
    async create(createDptDto) {
        security_util_1.SecurityUtil.validateObject(createDptDto);
        const dpt = this.dptRepository.create(createDptDto);
        return this.dptRepository.save(dpt);
    }
    async findAll() {
        return this.dptRepository.find({ relations: ['plan', 'technology'] });
    }
    async findOne(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const dpt = await this.dptRepository.findOne({
            where: { id: validId },
            relations: ['plan', 'technology'],
        });
        if (!dpt) {
            throw new common_1.NotFoundException(`Development Plan Technology with ID "${validId}" not found`);
        }
        return dpt;
    }
    async update(id, updateDptDto) {
        security_util_1.SecurityUtil.validateObject(updateDptDto);
        const dpt = await this.findOne(id);
        this.dptRepository.merge(dpt, updateDptDto);
        return this.dptRepository.save(dpt);
    }
    async remove(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const result = await this.dptRepository.delete(validId);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Development Plan Technology with ID "${validId}" not found`);
        }
    }
};
exports.DevelopmentPlanTechnologiesService = DevelopmentPlanTechnologiesService;
exports.DevelopmentPlanTechnologiesService = DevelopmentPlanTechnologiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(development_plan_technology_entity_1.DevelopmentPlanTechnology)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DevelopmentPlanTechnologiesService);
//# sourceMappingURL=development-plan-technologies.service.js.map