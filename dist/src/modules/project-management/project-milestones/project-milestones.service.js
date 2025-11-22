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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectMilestoneService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_milestone_entity_1 = require("./entities/project-milestone.entity");
const security_util_1 = require("../../../common/utils/security.util");
let ProjectMilestoneService = class ProjectMilestoneService {
    constructor(milestoneRepo) {
        this.milestoneRepo = milestoneRepo;
    }
    async create(dto) {
        security_util_1.SecurityUtil.validateObject(dto);
        const validProjectId = security_util_1.SecurityUtil.validateId(dto.project_id);
        const milestone = this.milestoneRepo.create({
            name: dto.name,
            description: dto.description,
            due_date: dto.due_date,
            status: dto.status,
            project: { id: validProjectId },
        });
        return this.milestoneRepo.save(milestone);
    }
    findAll() {
        return this.milestoneRepo.find();
    }
    async findOne(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const milestone = await this.milestoneRepo.findOne({
            where: { id: validId },
        });
        if (!milestone)
            throw new common_1.NotFoundException('Milestone not found');
        return milestone;
    }
    async update(id, dto) {
        security_util_1.SecurityUtil.validateObject(dto);
        const validId = security_util_1.SecurityUtil.validateId(id);
        await this.findOne(validId);
        await this.milestoneRepo.update(validId, dto);
        return this.findOne(validId);
    }
    async remove(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        await this.findOne(validId);
        return this.milestoneRepo.delete(validId);
    }
};
exports.ProjectMilestoneService = ProjectMilestoneService;
exports.ProjectMilestoneService = ProjectMilestoneService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_milestone_entity_1.ProjectMilestone)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectMilestoneService);
//# sourceMappingURL=project-milestones.service.js.map