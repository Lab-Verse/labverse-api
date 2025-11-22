import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddLogoToTechnologies1753360000025 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
