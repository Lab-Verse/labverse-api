"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevelopmentPlanServicesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const development_plan_services_service_1 = require("./development-plan-services.service");
const development_plan_services_controller_1 = require("./development-plan-services.controller");
const development_plan_service_entity_1 = require("./entities/development-plan-service.entity");
const development_plans_module_1 = require("../development-plans/development-plans.module");
const services_module_1 = require("../../services/services.module");
let DevelopmentPlanServicesModule = class DevelopmentPlanServicesModule {
};
exports.DevelopmentPlanServicesModule = DevelopmentPlanServicesModule;
exports.DevelopmentPlanServicesModule = DevelopmentPlanServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([development_plan_service_entity_1.DevelopmentPlanService]),
            development_plans_module_1.DevelopmentPlansModule,
            services_module_1.ServicesModule,
        ],
        controllers: [development_plan_services_controller_1.DevelopmentPlanServicesController],
        providers: [development_plan_services_service_1.DevelopmentPlanServicesService],
        exports: [development_plan_services_service_1.DevelopmentPlanServicesService, typeorm_1.TypeOrmModule],
    })
], DevelopmentPlanServicesModule);
//# sourceMappingURL=development-plan-services.module.js.map