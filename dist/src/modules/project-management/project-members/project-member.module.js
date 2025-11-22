"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectMembersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const project_member_entity_1 = require("./entities/project-member.entity");
const project_members_service_1 = require("./project-members.service");
const project_members_controller_1 = require("./project-members.controller");
let ProjectMembersModule = class ProjectMembersModule {
};
exports.ProjectMembersModule = ProjectMembersModule;
exports.ProjectMembersModule = ProjectMembersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([project_member_entity_1.ProjectMember])],
        providers: [project_members_service_1.ProjectMembersService],
        controllers: [project_members_controller_1.ProjectMembersController],
        exports: [typeorm_1.TypeOrmModule, project_members_service_1.ProjectMembersService],
    })
], ProjectMembersModule);
//# sourceMappingURL=project-member.module.js.map