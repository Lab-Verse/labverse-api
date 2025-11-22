"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTechnologies1753360000006 = void 0;
class CreateTechnologies1753360000006 {
    constructor() {
        this.name = 'CreateTechnologies1753360000006';
    }
    async up(queryRunner) {
        await queryRunner.query(`

      CREATE TABLE IF NOT EXISTS technologies (

        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

        name VARCHAR(100) UNIQUE NOT NULL,

        description VARCHAR(255),

        category VARCHAR(100),

        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

      );

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_technologies_name ON technologies(name);

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_technologies_category ON technologies(category);

    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS idx_technologies_category;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_technologies_name;`);
        await queryRunner.query(`DROP TABLE IF EXISTS technologies;`);
    }
}
exports.CreateTechnologies1753360000006 = CreateTechnologies1753360000006;
//# sourceMappingURL=1753360000006-CreateTechnologies.js.map