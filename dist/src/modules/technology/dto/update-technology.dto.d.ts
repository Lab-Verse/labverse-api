import { CreateTechnologyDto } from './create-technology.dto';
declare const UpdateTechnologyDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTechnologyDto>>;
export declare class UpdateTechnologyDto extends UpdateTechnologyDto_base {
    name?: string;
    description?: string;
    category?: string;
    logo?: string;
}
export {};
