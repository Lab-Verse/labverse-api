"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevelopmentPlanFeaturesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const development_plan_features_service_1 = require("./development-plan-features.service");
const development_plan_features_controller_1 = require("./development-plan-features.controller");
const development_plan_feature_entity_1 = require("./entities/development-plan-feature.entity");
const development_plans_module_1 = require("../development-plans/development-plans.module");
const plan_features_module_1 = require("../../plan-features/plan-features.module");
let DevelopmentPlanFeaturesModule = class DevelopmentPlanFeaturesModule {
};
exports.DevelopmentPlanFeaturesModule = DevelopmentPlanFeaturesModule;
exports.DevelopmentPlanFeaturesModule = DevelopmentPlanFeaturesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([development_plan_feature_entity_1.DevelopmentPlanFeature]),
            development_plans_module_1.DevelopmentPlansModule,
            plan_features_module_1.PlanFeaturesModule,
        ],
        controllers: [development_plan_features_controller_1.DevelopmentPlanFeaturesController],
        providers: [development_plan_features_service_1.DevelopmentPlanFeaturesService],
        exports: [development_plan_features_service_1.DevelopmentPlanFeaturesService, typeorm_1.TypeOrmModule],
    })
], DevelopmentPlanFeaturesModule);
//# sourceMappingURL=development-plan-features.module.js.map