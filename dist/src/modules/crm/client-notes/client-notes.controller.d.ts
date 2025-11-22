import { ClientNotesService } from './client-notes.service';
import { CreateClientNoteDto } from './dto/create-client-note.dto';
import { UpdateClientNoteDto } from './dto/update-client-note.dto';
export declare class ClientNotesController {
    private readonly clientNotesService;
    constructor(clientNotesService: ClientNotesService);
    create(createClientNoteDto: CreateClientNoteDto): Promise<import("./entities/client-note.entity").ClientNote>;
    findAll(): Promise<import("./entities/client-note.entity").ClientNote[]>;
    findByClient(clientId: string): Promise<import("./entities/client-note.entity").ClientNote[]>;
    findOne(id: string): Promise<import("./entities/client-note.entity").ClientNote>;
    update(id: string, updateClientNoteDto: UpdateClientNoteDto): Promise<import("./entities/client-note.entity").ClientNote>;
    remove(id: string): Promise<void>;
}
