import { JwtService } from '@nestjs/jwt';
export declare class TokenUtil {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    extractUserIdFromToken(token: string): string;
    extractUserIdFromRequest(request: any): string;
    getTokenPayload(token: string): any;
}
import { Request } from 'express';
import { ServiceResponse } from '../interfaces/service-response.interface';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    private readonly tokenUtil;
    constructor(userRepository: Repository<User>, tokenUtil: TokenUtil);
    removeSelf(request: Request): Promise<ServiceResponse<void>>;
    remove(id: string): Promise<ServiceResponse<void>>;
    getCurrentUser(request: Request): Promise<ServiceResponse<User>>;
}
