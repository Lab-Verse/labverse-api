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
exports.TaskCommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_comment_entity_1 = require("./entities/task-comment.entity");
const security_util_1 = require("../../../common/utils/security.util");
let TaskCommentService = class TaskCommentService {
    constructor(taskCommentRepo) {
        this.taskCommentRepo = taskCommentRepo;
    }
    async create(dto) {
        security_util_1.SecurityUtil.validateObject(dto);
        if (!dto.task_id) {
            throw new common_1.BadRequestException('Task ID is required to create a comment.');
        }
        const validTaskId = security_util_1.SecurityUtil.validateId(dto.task_id);
        const comment = this.taskCommentRepo.create({
            comment_text: dto.comment_text,
            task: { id: validTaskId },
            commented_by_employee_profile: dto.commented_by_employee_profile_id
                ? { id: security_util_1.SecurityUtil.validateId(dto.commented_by_employee_profile_id) }
                : null,
        });
        return this.taskCommentRepo.save(comment);
    }
    async findAll() {
        return this.taskCommentRepo.find({
            relations: ['task', 'commented_by_employee_profile'],
        });
    }
    async findOne(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const comment = await this.taskCommentRepo.findOne({
            where: { id: validId },
            relations: ['task', 'commented_by_employee_profile'],
        });
        if (!comment) {
            throw new common_1.NotFoundException(`Task comment with ID ${validId} not found`);
        }
        return comment;
    }
    async update(id, dto) {
        security_util_1.SecurityUtil.validateObject(dto);
        const validId = security_util_1.SecurityUtil.validateId(id);
        await this.findOne(validId);
        const updateData = {};
        if (dto.comment_text !== undefined) {
            updateData.comment_text = dto.comment_text;
        }
        if (dto.task_id !== undefined) {
            if (dto.task_id === null) {
                throw new common_1.BadRequestException('Task ID cannot be null for updating a comment as it is a required field.');
            }
            const validTaskId = security_util_1.SecurityUtil.validateId(dto.task_id);
            updateData.task = { id: validTaskId };
        }
        if (dto.commented_by_employee_profile_id !== undefined) {
            updateData.commented_by_employee_profile =
                dto.commented_by_employee_profile_id
                    ? {
                        id: security_util_1.SecurityUtil.validateId(dto.commented_by_employee_profile_id),
                    }
                    : null;
        }
        await this.taskCommentRepo.update(validId, updateData);
        return this.findOne(validId);
    }
    async remove(id) {
        const comment = await this.findOne(id);
        return this.taskCommentRepo.remove(comment);
    }
};
exports.TaskCommentService = TaskCommentService;
exports.TaskCommentService = TaskCommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_comment_entity_1.TaskComment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskCommentService);
//# sourceMappingURL=task-comments.service.js.map