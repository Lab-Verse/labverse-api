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
exports.DevelopmentPlanFeaturesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const development_plan_feature_entity_1 = require("./entities/development-plan-feature.entity");
const security_util_1 = require("../../../common/utils/security.util");
let DevelopmentPlanFeaturesService = class DevelopmentPlanFeaturesService {
    constructor(dpfRepository) {
        this.dpfRepository = dpfRepository;
    }
    async create(createDpfDto) {
        security_util_1.SecurityUtil.validateObject(createDpfDto);
        const dpf = this.dpfRepository.create(createDpfDto);
        return this.dpfRepository.save(dpf);
    }
    async findAll() {
        return this.dpfRepository.find({ relations: ['plan', 'feature'] });
    }
    async findOne(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const dpf = await this.dpfRepository.findOne({
            where: { id: validId },
            relations: ['plan', 'feature'],
        });
        if (!dpf) {
            throw new common_1.NotFoundException(`Development Plan Feature with ID "${validId}" not found`);
        }
        return dpf;
    }
    async update(id, updateDpfDto) {
        security_util_1.SecurityUtil.validateObject(updateDpfDto);
        const dpf = await this.findOne(id);
        this.dpfRepository.merge(dpf, updateDpfDto);
        return this.dpfRepository.save(dpf);
    }
    async remove(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const result = await this.dpfRepository.delete(validId);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Development Plan Feature with ID "${validId}" not found`);
        }
    }
};
exports.DevelopmentPlanFeaturesService = DevelopmentPlanFeaturesService;
exports.DevelopmentPlanFeaturesService = DevelopmentPlanFeaturesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(development_plan_feature_entity_1.DevelopmentPlanFeature)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DevelopmentPlanFeaturesService);
//# sourceMappingURL=development-plan-features.service.js.map