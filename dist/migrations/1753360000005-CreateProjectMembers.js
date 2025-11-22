"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjectMembers1753360000005 = void 0;
class CreateProjectMembers1753360000005 {
    constructor() {
        this.name = 'CreateProjectMembers1753360000005';
    }
    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS idx_project_members_role_on_project;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_project_members_user_id;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_project_members_project_id;`);
        await queryRunner.query(`DROP TABLE IF EXISTS project_members;`);
        await queryRunner.query(`

      CREATE TABLE IF NOT EXISTS project_members (

        project_id UUID NOT NULL,

        employee_profile_id UUID NOT NULL, -- Changed from user_id

        role_on_project VARCHAR(100) NOT NULL,

        assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        PRIMARY KEY (project_id, employee_profile_id), -- Changed primary key

        CONSTRAINT fk_project_members_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,

        CONSTRAINT fk_project_members_employee_profile FOREIGN KEY (employee_profile_id) REFERENCES employee_profiles(id) ON DELETE CASCADE -- Changed FK reference

      );

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_project_members_project_id ON project_members(project_id);

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_project_members_employee_profile_id ON project_members(employee_profile_id); -- Changed index name

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_project_members_role_on_project ON project_members(role_on_project);

    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS idx_project_members_role_on_project;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_project_members_employee_profile_id;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_project_members_project_id;`);
        await queryRunner.query(`DROP TABLE IF EXISTS project_members;`);
    }
}
exports.CreateProjectMembers1753360000005 = CreateProjectMembers1753360000005;
//# sourceMappingURL=1753360000005-CreateProjectMembers.js.map