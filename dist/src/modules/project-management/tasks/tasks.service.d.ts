import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskService {
    private taskRepo;
    constructor(taskRepo: Repository<Task>);
    create(dto: CreateTaskDto): Promise<{
        success: boolean;
        message: string;
        data: Task;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: Task[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: Task;
    }>;
    update(id: string, dto: UpdateTaskDto): Promise<{
        success: boolean;
        message: string;
        data: Task;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
