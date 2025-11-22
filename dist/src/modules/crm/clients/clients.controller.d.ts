import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-clients.dto';
import { UpdateClientDto } from './dto/update-clients.dto';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    create(createClientDto: CreateClientDto, profile_photo?: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/clients.entity").Client;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/clients.entity").Client[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/clients.entity").Client;
    }>;
    update(id: string, updateClientDto: UpdateClientDto, profile_photo?: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/clients.entity").Client;
    }>;
    remove(id: string): Promise<void>;
}
