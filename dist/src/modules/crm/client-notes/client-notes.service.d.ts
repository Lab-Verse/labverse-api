import { Repository } from 'typeorm';
import { ClientNote } from './entities/client-note.entity';
import { CreateClientNoteDto } from './dto/create-client-note.dto';
import { UpdateClientNoteDto } from './dto/update-client-note.dto';
export declare class ClientNotesService {
    private clientNoteRepository;
    constructor(clientNoteRepository: Repository<ClientNote>);
    create(createClientNoteDto: CreateClientNoteDto): Promise<ClientNote>;
    findAll(): Promise<ClientNote[]>;
    findByClient(clientId: string): Promise<ClientNote[]>;
    findOne(id: string): Promise<ClientNote>;
    update(id: string, updateClientNoteDto: UpdateClientNoteDto): Promise<ClientNote>;
    remove(id: string): Promise<void>;
}
