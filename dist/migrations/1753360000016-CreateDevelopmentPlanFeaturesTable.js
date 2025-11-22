"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDevelopmentPlanFeaturesTable1753360000016 = void 0;
const typeorm_1 = require("typeorm");
class CreateDevelopmentPlanFeaturesTable1753360000016 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'development_plan_features',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'gen_random_uuid()',
                },
                {
                    name: 'plan_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'feature_id',
                    type: 'uuid',
                    isNullable: false,
                },
            ],
        }), true);
        await queryRunner.createForeignKey('development_plan_features', new typeorm_1.TableForeignKey({
            columnNames: ['plan_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'development_plans',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('development_plan_features', new typeorm_1.TableForeignKey({
            columnNames: ['feature_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'plan_features',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('development_plan_features');
        const foreignKeyPlan = table.foreignKeys.find((fk) => fk.columnNames.includes('plan_id'));
        const foreignKeyFeature = table.foreignKeys.find((fk) => fk.columnNames.includes('feature_id'));
        if (foreignKeyPlan) {
            await queryRunner.dropForeignKey('development_plan_features', foreignKeyPlan);
        }
        if (foreignKeyFeature) {
            await queryRunner.dropForeignKey('development_plan_features', foreignKeyFeature);
        }
        await queryRunner.dropTable('development_plan_features');
    }
}
exports.CreateDevelopmentPlanFeaturesTable1753360000016 = CreateDevelopmentPlanFeaturesTable1753360000016;
//# sourceMappingURL=1753360000016-CreateDevelopmentPlanFeaturesTable.js.map