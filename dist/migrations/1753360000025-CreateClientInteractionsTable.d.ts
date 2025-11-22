import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateClientInteractionsTable1753360000025 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
