"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeProfilesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_service_1 = require("./employee.service");
const employee_controller_1 = require("./employee.controller");
const employee_entity_1 = require("./entities/employee.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const supabase_service_1 = require("../../../common/services/supabase.service");
let EmployeeProfilesModule = class EmployeeProfilesModule {
};
exports.EmployeeProfilesModule = EmployeeProfilesModule;
exports.EmployeeProfilesModule = EmployeeProfilesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employee_entity_1.EmployeeProfile, user_entity_1.User])],
        controllers: [employee_controller_1.EmployeeProfilesController],
        providers: [employee_service_1.EmployeeProfilesService, supabase_service_1.SupabaseService],
        exports: [employee_service_1.EmployeeProfilesService, supabase_service_1.SupabaseService],
    })
], EmployeeProfilesModule);
//# sourceMappingURL=employee.module.js.map