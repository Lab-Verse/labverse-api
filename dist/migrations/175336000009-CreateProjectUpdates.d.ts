import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateProjectUpdates1753360000009 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
