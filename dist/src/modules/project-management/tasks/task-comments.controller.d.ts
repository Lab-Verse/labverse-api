import { TaskCommentService } from './task-comments.service';
import { CreateTaskCommentDto } from './dto/create-task-comment.dto';
import { UpdateTaskCommentDto } from './dto/update-task-comment.dto';
export declare class TaskCommentController {
    private readonly taskCommentService;
    constructor(taskCommentService: TaskCommentService);
    create(dto: CreateTaskCommentDto): Promise<import("./entities/task-comment.entity").TaskComment>;
    findAll(): Promise<import("./entities/task-comment.entity").TaskComment[]>;
    findOne(id: string): Promise<import("./entities/task-comment.entity").TaskComment>;
    update(id: string, dto: UpdateTaskCommentDto): Promise<import("./entities/task-comment.entity").TaskComment>;
    remove(id: string): Promise<import("./entities/task-comment.entity").TaskComment>;
}
