import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateConversationsParticipantsMessages1753360000033 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
