"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlanFeaturesTable1753360000015 = void 0;
const typeorm_1 = require("typeorm");
class CreatePlanFeaturesTable1753360000015 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'plan_features',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'gen_random_uuid()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('plan_features');
    }
}
exports.CreatePlanFeaturesTable1753360000015 = CreatePlanFeaturesTable1753360000015;
//# sourceMappingURL=1753360000015-CreatePlanFeaturesTable.js.map