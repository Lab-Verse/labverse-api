"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjectTechnologies1753360000007 = void 0;
class CreateProjectTechnologies1753360000007 {
    constructor() {
        this.name = 'CreateProjectTechnologies1753360000007';
    }
    async up(queryRunner) {
        await queryRunner.query(`

      CREATE TABLE IF NOT EXISTS project_technologies (

        project_id UUID NOT NULL,

        technology_id UUID NOT NULL,

        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        PRIMARY KEY (project_id, technology_id),

        CONSTRAINT fk_project_technologies_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,

        CONSTRAINT fk_project_technologies_technology FOREIGN KEY (technology_id) REFERENCES technologies(id) ON DELETE CASCADE

      );

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_project_technologies_project_id ON project_technologies(project_id);

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_project_technologies_technology_id ON project_technologies(technology_id);

    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS idx_project_technologies_technology_id;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_project_technologies_project_id;`);
        await queryRunner.query(`DROP TABLE IF EXISTS project_technologies;`);
    }
}
exports.CreateProjectTechnologies1753360000007 = CreateProjectTechnologies1753360000007;
//# sourceMappingURL=1753360000007-CreateProjectTechnologies.js.map