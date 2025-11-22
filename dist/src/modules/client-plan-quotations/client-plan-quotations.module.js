"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPlanQuotationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const client_plan_quotations_service_1 = require("./client-plan-quotations.service");
const client_plan_quotations_controller_1 = require("./client-plan-quotations.controller");
const client_plan_quotation_entity_1 = require("./entities/client-plan-quotation.entity");
const clients_module_1 = require("../crm/clients/clients.module");
const development_plans_module_1 = require("../development/development-plans/development-plans.module");
const users_module_1 = require("../users/users.module");
let ClientPlanQuotationsModule = class ClientPlanQuotationsModule {
};
exports.ClientPlanQuotationsModule = ClientPlanQuotationsModule;
exports.ClientPlanQuotationsModule = ClientPlanQuotationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([client_plan_quotation_entity_1.ClientPlanQuotation]),
            clients_module_1.ClientsModule,
            development_plans_module_1.DevelopmentPlansModule,
            users_module_1.UsersModule,
        ],
        controllers: [client_plan_quotations_controller_1.ClientPlanQuotationsController],
        providers: [client_plan_quotations_service_1.ClientPlanQuotationsService],
        exports: [client_plan_quotations_service_1.ClientPlanQuotationsService, typeorm_1.TypeOrmModule],
    })
], ClientPlanQuotationsModule);
//# sourceMappingURL=client-plan-quotations.module.js.map