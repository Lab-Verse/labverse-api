import { TimeEntriesService } from './time-entries.service';
import { CreateTimeEntryDto } from './dto/create-time-entry.dto';
import { UpdateTimeEntryDto } from './dto/update-time-entry.dto';
export declare class TimeEntriesController {
    private readonly timeEntriesService;
    constructor(timeEntriesService: TimeEntriesService);
    create(createTimeEntryDto: CreateTimeEntryDto): Promise<import("./entities/time-entry.entity").TimeEntry>;
    findAll(): Promise<import("./entities/time-entry.entity").TimeEntry[]>;
    findByEmployee(employeeId: string): Promise<import("./entities/time-entry.entity").TimeEntry[]>;
    findByProject(projectId: string): Promise<import("./entities/time-entry.entity").TimeEntry[]>;
    findOne(id: string): Promise<import("./entities/time-entry.entity").TimeEntry>;
    update(id: string, updateTimeEntryDto: UpdateTimeEntryDto): Promise<import("./entities/time-entry.entity").TimeEntry>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
