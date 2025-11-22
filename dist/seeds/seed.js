"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = require("../src/config/data-source");
const role_entity_1 = require("../src/modules/roles/entities/role.entity");
const user_entity_1 = require("../src/modules/users/entities/user.entity");
const bcrypt = require("bcryptjs");
const role_enum_1 = require("../src/modules/roles/role.enum");
const security_util_1 = require("../src/common/utils/security.util");
const permissions_seed_1 = require("./permissions-seed");
async function seed() {
    await data_source_1.AppDataSource.initialize();
    try {
        const roleRepo = data_source_1.AppDataSource.getRepository(role_entity_1.Role);
        const userRepo = data_source_1.AppDataSource.getRepository(user_entity_1.User);
        const rolesToSeed = [
            { name: role_enum_1.RoleEnum.ADMIN, description: 'Administrator with full access' },
            { name: role_enum_1.RoleEnum.GUEST, description: 'Guest user with limited access' },
            { name: role_enum_1.RoleEnum.CLIENT, description: 'Client user with limited access' },
            {
                name: role_enum_1.RoleEnum.EMPLOYEE,
                description: 'Employee user with limited access',
            },
            {
                name: role_enum_1.RoleEnum.PROJECT_MANAGER,
                description: 'Project manager with project access',
            },
            { name: role_enum_1.RoleEnum.SUPPORT, description: 'Support user for tickets' },
        ];
        for (const roleData of rolesToSeed) {
            let role = await roleRepo.findOne({ where: { name: roleData.name } });
            if (!role) {
                role = roleRepo.create(roleData);
                await roleRepo.save(role);
                console.log(`Role "${security_util_1.SecurityUtil.sanitizeLogMessage(roleData.name)}" created.`);
            }
            else {
                console.log(`Role "${security_util_1.SecurityUtil.sanitizeLogMessage(roleData.name)}" already exists.`);
            }
        }
        const adminEmail = 'admin_labverse@gmail.com';
        let adminUser = await userRepo.findOne({ where: { email: adminEmail } });
        if (!adminUser) {
            const adminRole = await roleRepo.findOne({
                where: { name: role_enum_1.RoleEnum.ADMIN },
            });
            const password = await bcrypt.hash('Admin@12345', 10);
            adminUser = userRepo.create({
                email: adminEmail,
                password,
                fullName: 'Super Admin',
                role: adminRole,
            });
            await userRepo.save(adminUser);
            console.log(`Admin user "${adminEmail}" created with password: Admin@12345`);
        }
        else {
            console.log(`Admin user "${adminEmail}" already exists.`);
        }
        await (0, permissions_seed_1.seedPermissions)();
        console.log('✅ All seeding tasks completed successfully!');
    }
    catch (e) {
        console.error('Seeding error:', e);
        process.exit(1);
    }
    finally {
        await data_source_1.AppDataSource.destroy();
        console.log('🆑 Database connection closed.');
    }
    process.exit(0);
}
seed();
//# sourceMappingURL=seed.js.map