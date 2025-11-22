"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
dotenv.config();
const databaseConfig = () => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'postgres',
    entities: [__dirname + '/../modules/**/entities/*.entity.{ts,js}'],
    migrations: [__dirname + '/../../migrations/*.{ts,js}'],
    synchronize: false,
    logging: process.env.TYPEORM_LOGGING === 'true',
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
});
exports.default = databaseConfig;
//# sourceMappingURL=database.config.js.map