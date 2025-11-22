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
exports.TimeEntriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const time_entry_entity_1 = require("./entities/time-entry.entity");
const employee_entity_1 = require("../../hr/employees/entities/employee.entity");
const projects_entity_1 = require("../projects/entities/projects.entity");
const task_entity_1 = require("../tasks/entities/task.entity");
const security_util_1 = require("../../../common/utils/security.util");
let TimeEntriesService = class TimeEntriesService {
    constructor(timeEntryRepository, employeeRepository, projectRepository, taskRepository) {
        this.timeEntryRepository = timeEntryRepository;
        this.employeeRepository = employeeRepository;
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
    }
    async create(createTimeEntryDto) {
        try {
            const { employeeId, projectId, taskId } = createTimeEntryDto;
            if (employeeId) {
                const employee = await this.employeeRepository.findOne({
                    where: { id: employeeId },
                });
                if (!employee) {
                    throw new common_1.NotFoundException(`Employee with ID "${employeeId}" not found.`);
                }
            }
            if (projectId) {
                const project = await this.projectRepository.findOne({
                    where: { id: projectId },
                });
                if (!project) {
                    throw new common_1.NotFoundException(`Project with ID "${projectId}" not found.`);
                }
            }
            if (taskId) {
                const task = await this.taskRepository.findOne({
                    where: { id: taskId },
                });
                if (!task) {
                    throw new common_1.NotFoundException(`Task with ID "${taskId}" not found.`);
                }
            }
            const timeEntry = this.timeEntryRepository.create(createTimeEntryDto);
            return await this.timeEntryRepository.save(timeEntry);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error.code === '23503') {
                throw new common_1.NotFoundException('Referenced employee, project, or task not found.');
            }
            throw error;
        }
    }
    async findAll() {
        return this.timeEntryRepository.find({
            relations: ['employee', 'project', 'task'],
        });
    }
    async findByEmployee(employeeId) {
        const validEmployeeId = security_util_1.SecurityUtil.validateId(employeeId);
        return this.timeEntryRepository.find({
            where: { employeeId: validEmployeeId },
            relations: ['project', 'task'],
        });
    }
    async findByProject(projectId) {
        const validProjectId = security_util_1.SecurityUtil.validateId(projectId);
        return this.timeEntryRepository.find({
            where: { projectId: validProjectId },
            relations: ['employee', 'task'],
        });
    }
    async findOne(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const timeEntry = await this.timeEntryRepository.findOne({
            where: { id: validId },
            relations: ['employee', 'project', 'task'],
        });
        if (!timeEntry) {
            throw new common_1.NotFoundException(`Time entry with ID "${id}" not found.`);
        }
        return timeEntry;
    }
    async update(id, updateTimeEntryDto) {
        try {
            if (updateTimeEntryDto.employeeId) {
                const employee = await this.employeeRepository.findOne({
                    where: { id: updateTimeEntryDto.employeeId },
                });
                if (!employee) {
                    throw new common_1.NotFoundException(`Employee with ID "${updateTimeEntryDto.employeeId}" not found.`);
                }
            }
            if (updateTimeEntryDto.projectId) {
                const project = await this.projectRepository.findOne({
                    where: { id: updateTimeEntryDto.projectId },
                });
                if (!project) {
                    throw new common_1.NotFoundException(`Project with ID "${updateTimeEntryDto.projectId}" not found.`);
                }
            }
            if (updateTimeEntryDto.taskId) {
                const task = await this.taskRepository.findOne({
                    where: { id: updateTimeEntryDto.taskId },
                });
                if (!task) {
                    throw new common_1.NotFoundException(`Task with ID "${updateTimeEntryDto.taskId}" not found.`);
                }
            }
            const validId = security_util_1.SecurityUtil.validateId(id);
            await this.timeEntryRepository.update(validId, updateTimeEntryDto);
            return this.findOne(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error.code === '23503') {
                throw new common_1.NotFoundException('Referenced employee, project, or task not found.');
            }
            throw error;
        }
    }
    async remove(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const result = await this.timeEntryRepository.delete(validId);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Time entry with ID "${id}" not found.`);
        }
        return { message: 'Time entry successfully deleted' };
    }
};
exports.TimeEntriesService = TimeEntriesService;
exports.TimeEntriesService = TimeEntriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(time_entry_entity_1.TimeEntry)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.EmployeeProfile)),
    __param(2, (0, typeorm_1.InjectRepository)(projects_entity_1.Project)),
    __param(3, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TimeEntriesService);
//# sourceMappingURL=time-entries.service.js.map