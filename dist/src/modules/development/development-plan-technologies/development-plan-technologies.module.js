"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevelopmentPlanTechnologiesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const development_plan_technologies_service_1 = require("./development-plan-technologies.service");
const development_plan_technologies_controller_1 = require("./development-plan-technologies.controller");
const development_plan_technology_entity_1 = require("./entities/development-plan-technology.entity");
const development_plans_module_1 = require("../development-plans/development-plans.module");
const technology_module_1 = require("../../technology/technology.module");
let DevelopmentPlanTechnologiesModule = class DevelopmentPlanTechnologiesModule {
};
exports.DevelopmentPlanTechnologiesModule = DevelopmentPlanTechnologiesModule;
exports.DevelopmentPlanTechnologiesModule = DevelopmentPlanTechnologiesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([development_plan_technology_entity_1.DevelopmentPlanTechnology]),
            development_plans_module_1.DevelopmentPlansModule,
            technology_module_1.TechnologiesModule,
        ],
        controllers: [development_plan_technologies_controller_1.DevelopmentPlanTechnologiesController],
        providers: [development_plan_technologies_service_1.DevelopmentPlanTechnologiesService],
        exports: [development_plan_technologies_service_1.DevelopmentPlanTechnologiesService, typeorm_1.TypeOrmModule],
    })
], DevelopmentPlanTechnologiesModule);
//# sourceMappingURL=development-plan-technologies.module.js.map