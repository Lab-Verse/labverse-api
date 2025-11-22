"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjects1753360000004 = void 0;
class CreateProjects1753360000004 {
    constructor() {
        this.name = 'CreateProjects1753360000004';
    }
    async up(queryRunner) {
        await queryRunner.query(`

      CREATE TABLE IF NOT EXISTS projects (

        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

        name VARCHAR(255) UNIQUE NOT NULL,

        description TEXT,

        start_date TIMESTAMP WITH TIME ZONE,

        end_date TIMESTAMP WITH TIME ZONE,

        status VARCHAR(50) DEFAULT 'Planning' NOT NULL,

        budget NUMERIC(15, 2),

        creator_id UUID,

        images TEXT[],

        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_projects_creator FOREIGN KEY (creator_id) REFERENCES clients(id) ON DELETE SET NULL

      );

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_projects_name ON projects(name);

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_projects_creator_id ON projects(creator_id);

    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS idx_projects_creator_id;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_projects_status;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_projects_name;`);
        await queryRunner.query(`DROP TABLE IF EXISTS projects;`);
    }
}
exports.CreateProjects1753360000004 = CreateProjects1753360000004;
//# sourceMappingURL=1753360000004-CreateProjects.js.map