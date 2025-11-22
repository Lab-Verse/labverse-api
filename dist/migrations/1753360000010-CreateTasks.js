"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTasks1753360000010 = void 0;
class CreateTasks1753360000010 {
    constructor() {
        this.name = 'CreateTasks1753360000010';
    }
    async up(queryRunner) {
        await queryRunner.query(`

      CREATE TABLE IF NOT EXISTS tasks (

        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

        project_id UUID NOT NULL,

        project_milestone_id UUID,

        name VARCHAR(255) NOT NULL,

        description TEXT,

        status VARCHAR(50) DEFAULT 'To Do' NOT NULL,

        priority VARCHAR(50) DEFAULT 'Medium' NOT NULL,

        due_date TIMESTAMP WITH TIME ZONE,

        created_by_employee_profile_id UUID NOT NULL,

        assigned_to_employee_profile_id UUID,

        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_tasks_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,

        CONSTRAINT fk_tasks_milestone FOREIGN KEY (project_milestone_id) REFERENCES project_milestones(id) ON DELETE SET NULL,

        CONSTRAINT fk_tasks_created_by FOREIGN KEY (created_by_employee_profile_id) REFERENCES employee_profiles(id) ON DELETE RESTRICT,

        CONSTRAINT fk_tasks_assigned_to FOREIGN KEY (assigned_to_employee_profile_id) REFERENCES employee_profiles(id) ON DELETE SET NULL

      );

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_tasks_milestone_id ON tasks(project_milestone_id);

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to_id ON tasks(assigned_to_employee_profile_id);

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);

    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS idx_tasks_priority;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_tasks_status;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_tasks_assigned_to_id;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_tasks_milestone_id;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_tasks_project_id;`);
        await queryRunner.query(`DROP TABLE IF EXISTS tasks;`);
    }
}
exports.CreateTasks1753360000010 = CreateTasks1753360000010;
//# sourceMappingURL=1753360000010-CreateTasks.js.map