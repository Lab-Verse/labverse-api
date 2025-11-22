import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateQaSectionsTables1753360000029 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
