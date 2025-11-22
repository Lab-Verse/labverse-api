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
exports.ProjectUpdatesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_update_entity_1 = require("./entities/project-update.entity");
let ProjectUpdatesService = class ProjectUpdatesService {
    constructor(projectUpdateRepository) {
        this.projectUpdateRepository = projectUpdateRepository;
    }
    async create(dto) {
        const update = this.projectUpdateRepository.create(dto);
        return await this.projectUpdateRepository.save(update);
    }
    async findAll() {
        return await this.projectUpdateRepository.find({
            relations: ['project', 'createdByEmployee'],
        });
    }
    async findOne(id) {
        const update = await this.projectUpdateRepository.findOne({
            where: { id },
            relations: ['project', 'createdByEmployee'],
        });
        if (!update) {
            throw new common_1.NotFoundException(`ProjectUpdate with ID "${id}" not found`);
        }
        return update;
    }
    async update(id, dto) {
        const update = await this.findOne(id);
        Object.assign(update, dto);
        return await this.projectUpdateRepository.save(update);
    }
    async remove(id) {
        const update = await this.findOne(id);
        await this.projectUpdateRepository.remove(update);
    }
};
exports.ProjectUpdatesService = ProjectUpdatesService;
exports.ProjectUpdatesService = ProjectUpdatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_update_entity_1.ProjectUpdate)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectUpdatesService);
//# sourceMappingURL=project-updates.service.js.map