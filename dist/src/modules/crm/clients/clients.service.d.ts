import { Repository } from 'typeorm';
import { Client } from './entities/clients.entity';
import { CreateClientDto } from './dto/create-clients.dto';
import { UpdateClientDto } from './dto/update-clients.dto';
import { SupabaseService } from 'src/common/services/supabase.service';
export declare class ClientsService {
    private clientsRepository;
    private readonly supabaseService;
    constructor(clientsRepository: Repository<Client>, supabaseService: SupabaseService);
    create(dto: CreateClientDto, profile_photo?: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: Client;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: Client[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: Client;
    }>;
    update(id: string, dto: UpdateClientDto, profile_photo?: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: Client;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
