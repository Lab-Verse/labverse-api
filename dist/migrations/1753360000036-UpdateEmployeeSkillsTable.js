"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployeeSkillsTable1753360000036 = void 0;
class UpdateEmployeeSkillsTable1753360000036 {
    constructor() {
        this.name = 'UpdateEmployeeSkillsTable1753360000036';
    }
    async up(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS employee_skills CASCADE;`);
        await queryRunner.query(`

      CREATE TABLE employee_skills (

        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

        employee_id UUID NOT NULL,

        skill_id UUID NOT NULL,

        proficiency_level INTEGER DEFAULT 1,

        years_of_experience INTEGER DEFAULT 0,

        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_employee_skills_profile FOREIGN KEY (employee_id) REFERENCES employee_profiles(id) ON DELETE CASCADE,

        CONSTRAINT fk_employee_skills_skill FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,

        CONSTRAINT uk_employee_skill UNIQUE (employee_id, skill_id)

      );

    `);
        await queryRunner.query(`CREATE INDEX idx_employee_skills_employee_id ON employee_skills(employee_id);`);
        await queryRunner.query(`CREATE INDEX idx_employee_skills_skill_id ON employee_skills(skill_id);`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS employee_skills CASCADE;`);
    }
}
exports.UpdateEmployeeSkillsTable1753360000036 = UpdateEmployeeSkillsTable1753360000036;
//# sourceMappingURL=1753360000036-UpdateEmployeeSkillsTable.js.map