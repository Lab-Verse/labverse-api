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
exports.PlanFeaturesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const plan_feature_entity_1 = require("./entities/plan-feature.entity");
const security_util_1 = require("../../common/utils/security.util");
let PlanFeaturesService = class PlanFeaturesService {
    constructor(planFeaturesRepository) {
        this.planFeaturesRepository = planFeaturesRepository;
    }
    async create(createPlanFeatureDto) {
        security_util_1.SecurityUtil.validateObject(createPlanFeatureDto);
        const feature = this.planFeaturesRepository.create(createPlanFeatureDto);
        return this.planFeaturesRepository.save(feature);
    }
    async findAll() {
        return this.planFeaturesRepository.find();
    }
    async findOne(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const feature = await this.planFeaturesRepository.findOneBy({
            id: validId,
        });
        if (!feature) {
            throw new common_1.NotFoundException(`Plan Feature with ID "${id}" not found`);
        }
        return feature;
    }
    async update(id, updatePlanFeatureDto) {
        security_util_1.SecurityUtil.validateObject(updatePlanFeatureDto);
        const feature = await this.findOne(id);
        this.planFeaturesRepository.merge(feature, updatePlanFeatureDto);
        return this.planFeaturesRepository.save(feature);
    }
    async remove(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const result = await this.planFeaturesRepository.delete(validId);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Plan Feature with ID "${id}" not found`);
        }
    }
};
exports.PlanFeaturesService = PlanFeaturesService;
exports.PlanFeaturesService = PlanFeaturesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(plan_feature_entity_1.PlanFeature)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlanFeaturesService);
//# sourceMappingURL=plan-features.service.js.map