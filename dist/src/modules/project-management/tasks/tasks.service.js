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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
const validation_util_1 = require("../../../common/utils/validation.util");
const logger_util_1 = require("../../../common/utils/logger.util");
let TaskService = class TaskService {
    constructor(taskRepo) {
        this.taskRepo = taskRepo;
    }
    async create(dto) {
        validation_util_1.ValidationUtil.validateString(dto.name, 'name', 2, 200);
        if (dto.description) {
            validation_util_1.ValidationUtil.validateString(dto.description, 'description', 0, 1000);
        }
        if (dto.status) {
            validation_util_1.ValidationUtil.validateString(dto.status, 'status', 1, 50);
        }
        if (dto.priority) {
            validation_util_1.ValidationUtil.validateString(dto.priority, 'priority', 1, 50);
        }
        if (dto.due_date) {
            validation_util_1.ValidationUtil.validateDate(dto.due_date, 'due_date');
        }
        validation_util_1.ValidationUtil.validateUUID(dto.project_id, 'project_id');
        if (dto.project_milestone_id) {
            validation_util_1.ValidationUtil.validateUUID(dto.project_milestone_id, 'project_milestone_id');
        }
        if (dto.created_by_employee_profile_id) {
            validation_util_1.ValidationUtil.validateUUID(dto.created_by_employee_profile_id, 'created_by_employee_profile_id');
        }
        if (dto.assigned_to_employee_profile_id) {
            validation_util_1.ValidationUtil.validateUUID(dto.assigned_to_employee_profile_id, 'assigned_to_employee_profile_id');
        }
        const task = this.taskRepo.create({
            name: validation_util_1.ValidationUtil.sanitizeString(dto.name),
            description: dto.description
                ? validation_util_1.ValidationUtil.sanitizeString(dto.description)
                : undefined,
            status: dto.status,
            priority: dto.priority,
            due_date: dto.due_date,
            project: { id: dto.project_id },
            project_milestone: dto.project_milestone_id
                ? { id: dto.project_milestone_id }
                : undefined,
            created_by_employee_profile: dto.created_by_employee_profile_id
                ? { id: dto.created_by_employee_profile_id }
                : undefined,
            assigned_to_employee_profile: dto.assigned_to_employee_profile_id
                ? { id: dto.assigned_to_employee_profile_id }
                : undefined,
        });
        const savedTask = await this.taskRepo.save(task);
        logger_util_1.SafeLogger.log(`Task created successfully: ${dto.name}`, 'TaskService');
        return {
            success: true,
            message: 'Task created successfully',
            data: savedTask,
        };
    }
    async findAll() {
        const tasks = await this.taskRepo.find({
            relations: [
                'project',
                'project_milestone',
                'assigned_to_employee_profile',
            ],
        });
        return {
            success: true,
            message: 'Tasks retrieved successfully',
            data: tasks,
        };
    }
    async findOne(id) {
        validation_util_1.ValidationUtil.validateUUID(id, 'taskId');
        const task = await this.taskRepo.findOne({
            where: { id },
            relations: [
                'project',
                'project_milestone',
                'assigned_to_employee_profile',
            ],
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID "${id}" not found`);
        }
        return {
            success: true,
            message: 'Task retrieved successfully',
            data: task,
        };
    }
    async update(id, dto) {
        validation_util_1.ValidationUtil.validateUUID(id, 'taskId');
        if (dto.name) {
            validation_util_1.ValidationUtil.validateString(dto.name, 'name', 2, 200);
        }
        if (dto.description !== undefined) {
            if (dto.description) {
                validation_util_1.ValidationUtil.validateString(dto.description, 'description', 0, 1000);
            }
        }
        if (dto.status) {
            validation_util_1.ValidationUtil.validateString(dto.status, 'status', 1, 50);
        }
        if (dto.priority) {
            validation_util_1.ValidationUtil.validateString(dto.priority, 'priority', 1, 50);
        }
        if (dto.due_date) {
            validation_util_1.ValidationUtil.validateDate(dto.due_date, 'due_date');
        }
        if (dto.project_id) {
            validation_util_1.ValidationUtil.validateUUID(dto.project_id, 'project_id');
        }
        if (dto.project_milestone_id) {
            validation_util_1.ValidationUtil.validateUUID(dto.project_milestone_id, 'project_milestone_id');
        }
        if (dto.created_by_employee_profile_id) {
            validation_util_1.ValidationUtil.validateUUID(dto.created_by_employee_profile_id, 'created_by_employee_profile_id');
        }
        if (dto.assigned_to_employee_profile_id) {
            validation_util_1.ValidationUtil.validateUUID(dto.assigned_to_employee_profile_id, 'assigned_to_employee_profile_id');
        }
        const taskResult = await this.findOne(id);
        const task = taskResult.data;
        task.name = dto.name ? validation_util_1.ValidationUtil.sanitizeString(dto.name) : task.name;
        task.description =
            dto.description !== undefined
                ? dto.description
                    ? validation_util_1.ValidationUtil.sanitizeString(dto.description)
                    : null
                : task.description;
        task.status = dto.status ?? task.status;
        task.priority = dto.priority ?? task.priority;
        task.due_date = dto.due_date ?? task.due_date;
        if (dto.project_id) {
            task.project = { id: dto.project_id };
        }
        if (dto.project_milestone_id !== undefined) {
            task.project_milestone = dto.project_milestone_id
                ? { id: dto.project_milestone_id }
                : null;
        }
        if (dto.created_by_employee_profile_id !== undefined) {
            task.created_by_employee_profile = dto.created_by_employee_profile_id
                ? { id: dto.created_by_employee_profile_id }
                : null;
        }
        if (dto.assigned_to_employee_profile_id !== undefined) {
            task.assigned_to_employee_profile = dto.assigned_to_employee_profile_id
                ? { id: dto.assigned_to_employee_profile_id }
                : null;
        }
        const updatedTask = await this.taskRepo.save(task);
        logger_util_1.SafeLogger.log(`Task updated successfully: ${id}`, 'TaskService');
        return {
            success: true,
            message: 'Task updated successfully',
            data: updatedTask,
        };
    }
    async remove(id) {
        validation_util_1.ValidationUtil.validateUUID(id, 'taskId');
        const taskResult = await this.findOne(id);
        const task = taskResult.data;
        await this.taskRepo.remove(task);
        logger_util_1.SafeLogger.log(`Task deleted successfully: ${id}`, 'TaskService');
        return {
            success: true,
            message: 'Task deleted successfully',
        };
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskService);
//# sourceMappingURL=tasks.service.js.map