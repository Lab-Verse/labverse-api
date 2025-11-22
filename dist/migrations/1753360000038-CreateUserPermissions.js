"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserPermissions1753360000038 = void 0;
class CreateUserPermissions1753360000038 {
    constructor() {
        this.name = 'CreateUserPermissions1753360000038';
    }
    async up(queryRunner) {
        await queryRunner.query(`

      CREATE TABLE permissions (

        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

        name VARCHAR(255) NOT NULL UNIQUE,

        description TEXT,

        resource VARCHAR(100) NOT NULL,

        action VARCHAR(50) NOT NULL,

        created_at TIMESTAMP DEFAULT now(),

        updated_at TIMESTAMP DEFAULT now()

      )

    `);
        await queryRunner.query(`

      CREATE INDEX idx_permissions_name ON permissions(name)

    `);
        await queryRunner.query(`

      CREATE INDEX idx_permissions_resource ON permissions(resource)

    `);
        await queryRunner.query(`

      CREATE INDEX idx_permissions_action ON permissions(action)

    `);
        await queryRunner.query(`

      CREATE INDEX idx_permissions_resource_action ON permissions(resource, action)

    `);
        await queryRunner.query(`

      CREATE TABLE role_permissions (

        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

        role_id UUID NOT NULL,

        permission_id UUID NOT NULL,

        created_at TIMESTAMP DEFAULT now(),

        CONSTRAINT fk_role_permission_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,

        CONSTRAINT fk_role_permission_permission FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,

        UNIQUE(role_id, permission_id)

      )

    `);
        await queryRunner.query(`

      CREATE INDEX idx_role_permissions_role_id ON role_permissions(role_id)

    `);
        await queryRunner.query(`

      CREATE INDEX idx_role_permissions_permission_id ON role_permissions(permission_id)

    `);
        await queryRunner.query(`

      CREATE INDEX idx_role_permissions_role_permission ON role_permissions(role_id, permission_id)

    `);
        await queryRunner.query(`

      CREATE TABLE user_permissions (

        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

        user_id UUID NOT NULL,

        permission_id UUID NOT NULL,

        created_at TIMESTAMP DEFAULT now(),

        CONSTRAINT fk_user_permission_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

        CONSTRAINT fk_user_permission_permission FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,

        UNIQUE(user_id, permission_id)

      )

    `);
        await queryRunner.query(`

      CREATE INDEX idx_user_permissions_user_id ON user_permissions(user_id)

    `);
        await queryRunner.query(`

      CREATE INDEX idx_user_permissions_permission_id ON user_permissions(permission_id)

    `);
        await queryRunner.query(`

      CREATE INDEX idx_user_permissions_user_permission ON user_permissions(user_id, permission_id)

    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS idx_user_permissions_user_permission`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_user_permissions_permission_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_user_permissions_user_id`);
        await queryRunner.query(`DROP TABLE IF EXISTS user_permissions`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_role_permissions_role_permission`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_role_permissions_permission_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_role_permissions_role_id`);
        await queryRunner.query(`DROP TABLE IF EXISTS role_permissions`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_permissions_resource_action`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_permissions_action`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_permissions_resource`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_permissions_name`);
        await queryRunner.query(`DROP TABLE IF EXISTS permissions`);
    }
}
exports.CreateUserPermissions1753360000038 = CreateUserPermissions1753360000038;
//# sourceMappingURL=1753360000038-CreateUserPermissions.js.map