import { User } from '../../modules/users/entities/user.entity';
export declare class AuditLog {
    id: string;
    action: string;
    resource: string;
    resourceId: string;
    userId: string;
    user: User;
    oldValues: any;
    newValues: any;
    ipAddress: string;
    userAgent: string;
    createdAt: Date;
}
