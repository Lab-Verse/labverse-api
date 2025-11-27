import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientsTable1753359999999 implements MigrationInterface {
  name = 'CreateClientsTable1753359999999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS client_profile (
        user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        profile_photo VARCHAR(255),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        phone VARCHAR(50),
        company VARCHAR(100),
        address VARCHAR(255),
        website VARCHAR(255),
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS client_profile;`);
  }
}
