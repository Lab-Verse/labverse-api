import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateTechnologies1753360000006 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
