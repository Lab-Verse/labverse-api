"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanFeaturesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const plan_features_service_1 = require("./plan-features.service");
const plan_features_controller_1 = require("./plan-features.controller");
const plan_feature_entity_1 = require("./entities/plan-feature.entity");
let PlanFeaturesModule = class PlanFeaturesModule {
};
exports.PlanFeaturesModule = PlanFeaturesModule;
exports.PlanFeaturesModule = PlanFeaturesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([plan_feature_entity_1.PlanFeature])],
        controllers: [plan_features_controller_1.PlanFeaturesController],
        providers: [plan_features_service_1.PlanFeaturesService],
        exports: [plan_features_service_1.PlanFeaturesService, typeorm_1.TypeOrmModule],
    })
], PlanFeaturesModule);
//# sourceMappingURL=plan-features.module.js.map