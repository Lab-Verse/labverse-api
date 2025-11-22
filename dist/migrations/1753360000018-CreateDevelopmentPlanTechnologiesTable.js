"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDevelopmentPlanTechnologiesTable1753360000018 = void 0;
const typeorm_1 = require("typeorm");
class CreateDevelopmentPlanTechnologiesTable1753360000018 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'development_plan_technologies',
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
                    name: 'technology_id',
                    type: 'uuid',
                    isNullable: false,
                },
            ],
        }), true);
        await queryRunner.createForeignKey('development_plan_technologies', new typeorm_1.TableForeignKey({
            columnNames: ['plan_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'development_plans',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('development_plan_technologies', new typeorm_1.TableForeignKey({
            columnNames: ['technology_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'technologies',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('development_plan_technologies');
        const foreignKeyPlan = table.foreignKeys.find((fk) => fk.columnNames.includes('plan_id'));
        const foreignKeyTechnology = table.foreignKeys.find((fk) => fk.columnNames.includes('technology_id'));
        if (foreignKeyPlan) {
            await queryRunner.dropForeignKey('development_plan_technologies', foreignKeyPlan);
        }
        if (foreignKeyTechnology) {
            await queryRunner.dropForeignKey('development_plan_technologies', foreignKeyTechnology);
        }
        await queryRunner.dropTable('development_plan_technologies');
    }
}
exports.CreateDevelopmentPlanTechnologiesTable1753360000018 = CreateDevelopmentPlanTechnologiesTable1753360000018;
//# sourceMappingURL=1753360000018-CreateDevelopmentPlanTechnologiesTable.js.map