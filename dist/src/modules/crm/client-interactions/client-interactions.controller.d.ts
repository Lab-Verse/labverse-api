import { ClientInteractionsService } from './client-interactions.service';
import { CreateClientInteractionDto } from './dto/create-client-interaction.dto';
import { UpdateClientInteractionDto } from './dto/update-client-interaction.dto';
export declare class ClientInteractionsController {
    private readonly clientInteractionsService;
    constructor(clientInteractionsService: ClientInteractionsService);
    create(createClientInteractionDto: CreateClientInteractionDto): Promise<import("./entities/client-interaction.entity").ClientInteraction>;
    findAll(): Promise<import("./entities/client-interaction.entity").ClientInteraction[]>;
    findByClient(clientId: string): Promise<import("./entities/client-interaction.entity").ClientInteraction[]>;
    findOne(id: string): Promise<import("./entities/client-interaction.entity").ClientInteraction>;
    update(id: string, updateClientInteractionDto: UpdateClientInteractionDto): Promise<import("./entities/client-interaction.entity").ClientInteraction>;
    remove(id: string): Promise<void>;
}
