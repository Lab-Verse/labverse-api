"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBlogCommentsTable1753360000028 = void 0;
const typeorm_1 = require("typeorm");
class CreateBlogCommentsTable1753360000028 {
    constructor() {
        this.name = 'CreateBlogCommentsTable1753360000028';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'blog_comments',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'gen_random_uuid()',
                },
                {
                    name: 'post_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'guest_name',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'guest_email',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'comment_content',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'parent_comment_id',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'is_approved',
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
        await queryRunner.createForeignKey('blog_comments', new typeorm_1.TableForeignKey({
            columnNames: ['post_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'blog_posts',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('blog_comments', new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'employee_profiles',
            onDelete: 'SET NULL',
        }));
        await queryRunner.createForeignKey('blog_comments', new typeorm_1.TableForeignKey({
            columnNames: ['parent_comment_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'blog_comments',
            onDelete: 'SET NULL',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('blog_comments');
        const foreignKeyPost = table.foreignKeys.find((fk) => fk.columnNames.indexOf('post_id') !== -1);
        const foreignKeyUser = table.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
        const foreignKeyParent = table.foreignKeys.find((fk) => fk.columnNames.indexOf('parent_comment_id') !== -1);
        if (foreignKeyPost)
            await queryRunner.dropForeignKey('blog_comments', foreignKeyPost);
        if (foreignKeyUser)
            await queryRunner.dropForeignKey('blog_comments', foreignKeyUser);
        if (foreignKeyParent)
            await queryRunner.dropForeignKey('blog_comments', foreignKeyParent);
        await queryRunner.dropTable('blog_comments');
    }
}
exports.CreateBlogCommentsTable1753360000028 = CreateBlogCommentsTable1753360000028;
//# sourceMappingURL=1753360000028-CreateBlogCommentsTable.js.map