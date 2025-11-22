"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDevelopmentPlanServicesTable1753360000017 = void 0;
const typeorm_1 = require("typeorm");
class CreateDevelopmentPlanServicesTable1753360000017 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'development_plan_services',
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
                    name: 'service_id',
                    type: 'uuid',
                    isNullable: false,
                },
            ],
        }), true);
        await queryRunner.createForeignKey('development_plan_services', new typeorm_1.TableForeignKey({
            columnNames: ['plan_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'development_plans',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('development_plan_services', new typeorm_1.TableForeignKey({
            columnNames: ['service_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'services',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('development_plan_services');
        const foreignKeyPlan = table.foreignKeys.find((fk) => fk.columnNames.includes('plan_id'));
        const foreignKeyService = table.foreignKeys.find((fk) => fk.columnNames.includes('service_id'));
        if (foreignKeyPlan) {
            await queryRunner.dropForeignKey('development_plan_services', foreignKeyPlan);
        }
        if (foreignKeyService) {
            await queryRunner.dropForeignKey('development_plan_services', foreignKeyService);
        }
        await queryRunner.dropTable('development_plan_services');
    }
}
exports.CreateDevelopmentPlanServicesTable1753360000017 = CreateDevelopmentPlanServicesTable1753360000017;
//# sourceMappingURL=1753360000017-CreateDevelopmentPlanServicesTable.js.map