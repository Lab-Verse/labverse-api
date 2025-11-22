import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateClientNotesTable1753360000024 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
