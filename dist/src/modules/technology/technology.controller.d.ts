import { TechnologiesService } from './technology.service';
export declare class TechnologiesController {
    private readonly technologiesService;
    private readonly logger;
    constructor(technologiesService: TechnologiesService);
    create(body: any, logo?: Express.Multer.File): Promise<import("./entities/technology.entity").Technology>;
    findAll(): Promise<import("./entities/technology.entity").Technology[]>;
    findOne(id: string): Promise<import("./entities/technology.entity").Technology>;
    update(id: string, body: any, logo?: Express.Multer.File): Promise<import("./entities/technology.entity").Technology>;
    remove(id: string): Promise<void>;
}
