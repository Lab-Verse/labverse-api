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
exports.DevelopmentPlanFeature = void 0;
const typeorm_1 = require("typeorm");
const development_plan_entity_1 = require("../../development-plans/entities/development-plan.entity");
const plan_feature_entity_1 = require("../../../plan-features/entities/plan-feature.entity");
let DevelopmentPlanFeature = class DevelopmentPlanFeature {
};
exports.DevelopmentPlanFeature = DevelopmentPlanFeature;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DevelopmentPlanFeature.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], DevelopmentPlanFeature.prototype, "plan_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], DevelopmentPlanFeature.prototype, "feature_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => development_plan_entity_1.DevelopmentPlan, (plan) => plan.developmentPlanFeatures, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'plan_id' }),
    __metadata("design:type", development_plan_entity_1.DevelopmentPlan)
], DevelopmentPlanFeature.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plan_feature_entity_1.PlanFeature, (feature) => feature.developmentPlanFeatures, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'feature_id' }),
    __metadata("design:type", plan_feature_entity_1.PlanFeature)
], DevelopmentPlanFeature.prototype, "feature", void 0);
exports.DevelopmentPlanFeature = DevelopmentPlanFeature = __decorate([
    (0, typeorm_1.Entity)('development_plan_features')
], DevelopmentPlanFeature);
//# sourceMappingURL=development-plan-feature.entity.js.map