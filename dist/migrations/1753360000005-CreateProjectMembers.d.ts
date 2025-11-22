import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateProjectMembers1753360000005 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
