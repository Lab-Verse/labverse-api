"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQaSectionsTables1753360000029 = void 0;
const typeorm_1 = require("typeorm");
class CreateQaSectionsTables1753360000029 {
    constructor() {
        this.name = 'CreateQaSectionsTables1753360000029';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'questions',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'gen_random_uuid()',
                },
                {
                    name: 'question_text',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'asked_by',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'category_id',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'is_published',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }));
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'answers',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'gen_random_uuid()',
                },
                {
                    name: 'question_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'answer_text',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'answered_by',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }));
        await queryRunner.createForeignKey('questions', new typeorm_1.TableForeignKey({
            columnNames: ['asked_by'],
            referencedColumnNames: ['id'],
            referencedTableName: 'employee_profiles',
            onDelete: 'SET NULL',
        }));
        await queryRunner.createForeignKey('questions', new typeorm_1.TableForeignKey({
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'categories',
            onDelete: 'SET NULL',
        }));
        await queryRunner.createForeignKey('answers', new typeorm_1.TableForeignKey({
            columnNames: ['question_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'questions',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('answers', new typeorm_1.TableForeignKey({
            columnNames: ['answered_by'],
            referencedColumnNames: ['id'],
            referencedTableName: 'employee_profiles',
            onDelete: 'SET NULL',
        }));
    }
    async down(queryRunner) {
        const answersTable = await queryRunner.getTable('answers');
        const answersFkQuestion = answersTable.foreignKeys.find((fk) => fk.columnNames.indexOf('question_id') !== -1);
        const answersFkAnsweredBy = answersTable.foreignKeys.find((fk) => fk.columnNames.indexOf('answered_by') !== -1);
        if (answersFkQuestion)
            await queryRunner.dropForeignKey('answers', answersFkQuestion);
        if (answersFkAnsweredBy)
            await queryRunner.dropForeignKey('answers', answersFkAnsweredBy);
        await queryRunner.dropTable('answers');
        const questionsTable = await queryRunner.getTable('questions');
        const questionsFkAskedBy = questionsTable.foreignKeys.find((fk) => fk.columnNames.indexOf('asked_by') !== -1);
        const questionsFkCategory = questionsTable.foreignKeys.find((fk) => fk.columnNames.indexOf('category_id') !== -1);
        if (questionsFkAskedBy)
            await queryRunner.dropForeignKey('questions', questionsFkAskedBy);
        if (questionsFkCategory)
            await queryRunner.dropForeignKey('questions', questionsFkCategory);
        await queryRunner.dropTable('questions');
    }
}
exports.CreateQaSectionsTables1753360000029 = CreateQaSectionsTables1753360000029;
//# sourceMappingURL=1753360000029-CreateQaSectionsTables.js.map