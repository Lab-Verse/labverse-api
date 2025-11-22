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
exports.PlanFeature = void 0;
const typeorm_1 = require("typeorm");
const development_plan_feature_entity_1 = require("../../development/development-plan-features/entities/development-plan-feature.entity");
let PlanFeature = class PlanFeature {
};
exports.PlanFeature = PlanFeature;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PlanFeature.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false, unique: true }),
    __metadata("design:type", String)
], PlanFeature.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PlanFeature.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => development_plan_feature_entity_1.DevelopmentPlanFeature, (dpf) => dpf.feature),
    __metadata("design:type", Array)
], PlanFeature.prototype, "developmentPlanFeatures", void 0);
exports.PlanFeature = PlanFeature = __decorate([
    (0, typeorm_1.Entity)('plan_features')
], PlanFeature);
//# sourceMappingURL=plan-feature.entity.js.map