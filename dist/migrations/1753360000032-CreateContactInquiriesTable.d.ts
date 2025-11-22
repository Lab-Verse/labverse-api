import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateContactInquiriesTable1753360000032 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
