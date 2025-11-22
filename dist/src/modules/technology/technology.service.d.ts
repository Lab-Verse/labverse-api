import { Repository } from 'typeorm';
import { Technology } from './entities/technology.entity';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { SupabaseService } from 'src/common/services/supabase.service';
export declare class TechnologiesService {
    private readonly technologyRepository;
    private readonly supabaseService;
    constructor(technologyRepository: Repository<Technology>, supabaseService: SupabaseService);
    create(createTechnologyDto: CreateTechnologyDto, logoFile?: Express.Multer.File): Promise<Technology>;
    findAll(): Promise<Technology[]>;
    findOne(id: string): Promise<Technology>;
    update(id: string, updateTechnologyDto: UpdateTechnologyDto, logoFile?: Express.Multer.File): Promise<Technology>;
    remove(id: string): Promise<void>;
}
