import { Repository } from 'typeorm';
import { TaskComment } from './entities/task-comment.entity';
import { CreateTaskCommentDto } from './dto/create-task-comment.dto';
import { UpdateTaskCommentDto } from './dto/update-task-comment.dto';
export declare class TaskCommentService {
    private readonly taskCommentRepo;
    constructor(taskCommentRepo: Repository<TaskComment>);
    create(dto: CreateTaskCommentDto): Promise<TaskComment>;
    findAll(): Promise<TaskComment[]>;
    findOne(id: string): Promise<TaskComment>;
    update(id: string, dto: UpdateTaskCommentDto): Promise<TaskComment>;
    remove(id: string): Promise<TaskComment>;
}
