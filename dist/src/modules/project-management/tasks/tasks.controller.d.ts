import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(dto: CreateTaskDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/task.entity").Task;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/task.entity").Task[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/task.entity").Task;
    }>;
    update(id: string, dto: UpdateTaskDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/task.entity").Task;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
