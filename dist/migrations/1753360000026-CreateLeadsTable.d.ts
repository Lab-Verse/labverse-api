import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateLeadsTable1753360000026 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
