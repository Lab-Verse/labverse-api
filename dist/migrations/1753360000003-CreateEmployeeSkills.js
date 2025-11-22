"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmployeeSkills1753360000003 = void 0;
class CreateEmployeeSkills1753360000003 {
    constructor() {
        this.name = 'CreateEmployeeSkills1753360000003';
    }
    async up(queryRunner) {
        await queryRunner.query(`

      CREATE TABLE IF NOT EXISTS employee_skills (

        employee_profile_id UUID NOT NULL,

        skill_id UUID NOT NULL,

        proficiency_level VARCHAR(50),

        years_of_experience INTEGER,

        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        PRIMARY KEY (employee_profile_id, skill_id),

        CONSTRAINT fk_employee_skills_profile FOREIGN KEY (employee_profile_id) REFERENCES employee_profiles(id) ON DELETE CASCADE,

        CONSTRAINT fk_employee_skills_skill FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE

      );

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_employee_skills_profile_id ON employee_skills(employee_profile_id);

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_employee_skills_skill_id ON employee_skills(skill_id);

    `);
        await queryRunner.query(`

      CREATE INDEX IF NOT EXISTS idx_employee_skills_proficiency_level ON employee_skills(proficiency_level);

    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS idx_employee_skills_proficiency_level;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_employee_skills_skill_id;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_employee_skills_profile_id;`);
        await queryRunner.query(`DROP TABLE IF EXISTS employee_skills;`);
    }
}
exports.CreateEmployeeSkills1753360000003 = CreateEmployeeSkills1753360000003;
//# sourceMappingURL=1753360000003-CreateEmployeeSkills.js.map