import { Repository } from 'typeorm';
import { TimeEntry } from './entities/time-entry.entity';
import { CreateTimeEntryDto } from './dto/create-time-entry.dto';
import { UpdateTimeEntryDto } from './dto/update-time-entry.dto';
import { EmployeeProfile } from '../../hr/employees/entities/employee.entity';
import { Project } from '../projects/entities/projects.entity';
import { Task } from '../tasks/entities/task.entity';
export declare class TimeEntriesService {
    private timeEntryRepository;
    private employeeRepository;
    private projectRepository;
    private taskRepository;
    constructor(timeEntryRepository: Repository<TimeEntry>, employeeRepository: Repository<EmployeeProfile>, projectRepository: Repository<Project>, taskRepository: Repository<Task>);
    create(createTimeEntryDto: CreateTimeEntryDto): Promise<TimeEntry>;
    findAll(): Promise<TimeEntry[]>;
    findByEmployee(employeeId: string): Promise<TimeEntry[]>;
    findByProject(projectId: string): Promise<TimeEntry[]>;
    findOne(id: string): Promise<TimeEntry>;
    update(id: string, updateTimeEntryDto: UpdateTimeEntryDto): Promise<TimeEntry>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
