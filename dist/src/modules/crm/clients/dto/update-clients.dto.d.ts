import { CreateClientDto } from './create-clients.dto';
declare const UpdateClientDto_base: import("@nestjs/common").Type<Partial<CreateClientDto>>;
export declare class UpdateClientDto extends UpdateClientDto_base {
    profilePhoto?: string;
}
export {};
