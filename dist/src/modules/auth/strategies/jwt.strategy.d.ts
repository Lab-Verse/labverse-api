import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(payload: any): Promise<{
        id: string;
        email: string;
        fullName: string;
        role: import("../../roles/entities/role.entity").Role;
        permissions: import("../../permissions/entities/permission.entity").Permission[];
    }>;
}
export {};
