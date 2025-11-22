"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjectUpdates1753360000009 = void 0;
class CreateProjectUpdates1753360000009 {
    constructor() {
        this.name = 'CreateProjectUpdates1753360000009';
    }
    async up(queryRunner) {
        await queryRunner.query(`

      CREATE TABLE IF NOT EXISTS project_updates (

        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

        project_id UUID NOT NULL,

        title VARCHAR(255) NOT NULL,

        description TEXT NOT NULL,

        update_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        created_by_employee_profile_id UUID NOT NULL,

        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_project_updates_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,

        CONSTRAINT fk_project_updates_created_by FOREIGN KEY (created_by_employee_profile_id) REFERENCES employee_profiles(id) ON DELETE RESTRICT

      );

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_project_updates_project_id ON project_updates(project_id);

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_project_updates_created_by_id ON project_updates(created_by_employee_profile_id);

    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS idx_project_updates_created_by_id;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_project_updates_project_id;`);
        await queryRunner.query(`DROP TABLE IF EXISTS project_updates;`);
    }
}
exports.CreateProjectUpdates1753360000009 = CreateProjectUpdates1753360000009;
//# sourceMappingURL=175336000009-CreateProjectUpdates.js.map