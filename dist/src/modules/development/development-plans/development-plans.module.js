"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevelopmentPlansModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const development_plans_service_1 = require("./development-plans.service");
const development_plans_controller_1 = require("./development-plans.controller");
const development_plan_entity_1 = require("./entities/development-plan.entity");
let DevelopmentPlansModule = class DevelopmentPlansModule {
};
exports.DevelopmentPlansModule = DevelopmentPlansModule;
exports.DevelopmentPlansModule = DevelopmentPlansModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([development_plan_entity_1.DevelopmentPlan])],
        controllers: [development_plans_controller_1.DevelopmentPlansController],
        providers: [development_plans_service_1.DevelopmentPlansService],
        exports: [development_plans_service_1.DevelopmentPlansService, typeorm_1.TypeOrmModule],
    })
], DevelopmentPlansModule);
//# sourceMappingURL=development-plans.module.js.map