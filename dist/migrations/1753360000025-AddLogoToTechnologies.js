"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddLogoToTechnologies1753360000025 = void 0;
class AddLogoToTechnologies1753360000025 {
    constructor() {
        this.name = 'AddLogoToTechnologies1753360000025';
    }
    async up(queryRunner) {
        await queryRunner.query(`

      ALTER TABLE technologies 

      ADD COLUMN logo VARCHAR(500);

    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`

      ALTER TABLE technologies 

      DROP COLUMN logo;

    `);
    }
}
exports.AddLogoToTechnologies1753360000025 = AddLogoToTechnologies1753360000025;
//# sourceMappingURL=1753360000025-AddLogoToTechnologies.js.map