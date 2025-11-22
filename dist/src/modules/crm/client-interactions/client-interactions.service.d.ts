import { Repository } from 'typeorm';
import { ClientInteraction } from './entities/client-interaction.entity';
import { CreateClientInteractionDto } from './dto/create-client-interaction.dto';
import { UpdateClientInteractionDto } from './dto/update-client-interaction.dto';
export declare class ClientInteractionsService {
    private clientInteractionRepository;
    constructor(clientInteractionRepository: Repository<ClientInteraction>);
    create(createClientInteractionDto: CreateClientInteractionDto): Promise<ClientInteraction>;
    findAll(): Promise<ClientInteraction[]>;
    findByClient(clientId: string): Promise<ClientInteraction[]>;
    findOne(id: string): Promise<ClientInteraction>;
    update(id: string, updateClientInteractionDto: UpdateClientInteractionDto): Promise<ClientInteraction>;
    remove(id: string): Promise<void>;
}
