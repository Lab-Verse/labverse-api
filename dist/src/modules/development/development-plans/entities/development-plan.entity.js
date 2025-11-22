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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevelopmentPlan = void 0;
const typeorm_1 = require("typeorm");
const development_plan_feature_entity_1 = require("../../development-plan-features/entities/development-plan-feature.entity");
const development_plan_service_entity_1 = require("../../development-plan-services/entities/development-plan-service.entity");
const development_plan_technology_entity_1 = require("../../development-plan-technologies/entities/development-plan-technology.entity");
const client_plan_quotation_entity_1 = require("../../../client-plan-quotations/entities/client-plan-quotation.entity");
let DevelopmentPlan = class DevelopmentPlan {
};
exports.DevelopmentPlan = DevelopmentPlan;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DevelopmentPlan.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false, unique: true }),
    __metadata("design:type", String)
], DevelopmentPlan.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], DevelopmentPlan.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], DevelopmentPlan.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], DevelopmentPlan.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => development_plan_feature_entity_1.DevelopmentPlanFeature, (dpf) => dpf.plan),
    __metadata("design:type", Array)
], DevelopmentPlan.prototype, "developmentPlanFeatures", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => development_plan_service_entity_1.DevelopmentPlanService, (dps) => dps.plan),
    __metadata("design:type", Array)
], DevelopmentPlan.prototype, "developmentPlanServices", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => development_plan_technology_entity_1.DevelopmentPlanTechnology, (dpt) => dpt.plan),
    __metadata("design:type", Array)
], DevelopmentPlan.prototype, "developmentPlanTechnologies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => client_plan_quotation_entity_1.ClientPlanQuotation, (quotation) => quotation.plan),
    __metadata("design:type", Array)
], DevelopmentPlan.prototype, "clientPlanQuotations", void 0);
exports.DevelopmentPlan = DevelopmentPlan = __decorate([
    (0, typeorm_1.Entity)('development_plans')
], DevelopmentPlan);
//# sourceMappingURL=development-plan.entity.js.map