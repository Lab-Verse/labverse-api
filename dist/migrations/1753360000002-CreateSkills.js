"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSkills1753360000002 = void 0;
class CreateSkills1753360000002 {
    constructor() {
        this.name = 'CreateSkills1753360000002';
    }
    async up(queryRunner) {
        await queryRunner.query(`

      CREATE TABLE IF NOT EXISTS skills (

        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

        name VARCHAR(100) UNIQUE NOT NULL,

        description VARCHAR(255),

        category VARCHAR(100),

        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

      );

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_skills_name ON skills(name);

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);

    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS idx_skills_category;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_skills_name;`);
        await queryRunner.query(`DROP TABLE IF EXISTS skills;`);
    }
}
exports.CreateSkills1753360000002 = CreateSkills1753360000002;
//# sourceMappingURL=1753360000002-CreateSkills.js.map