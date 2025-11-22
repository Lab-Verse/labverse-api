"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const global_validation_pipe_1 = require("./common/pipes/global-validation.pipe");
const helmet_1 = require("helmet");
const express_rate_limit_1 = require("express-rate-limit");
function getAllowedOrigins() {
    const list = (process.env.FRONTEND_URLS || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    const extra = [
        'https://api.labverse.org',
        'http://localhost:3000',
        'https://labverse.org',
        'https://www.labverse.org',
    ];
    for (const e of extra)
        if (!list.includes(e))
            list.push(e);
    return list;
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.getHttpAdapter().getInstance().set('trust proxy', 1);
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                'img-src': ["'self'", 'data:', 'https:'],
                'script-src': ["'self'", "'unsafe-inline'"],
                'style-src': ["'self'", "'unsafe-inline'"],
            },
        },
        crossOriginEmbedderPolicy: false,
        crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
    }));
    app.use((0, express_rate_limit_1.default)({
        windowMs: 60 * 1000,
        limit: 300,
        standardHeaders: true,
        legacyHeaders: false,
    }));
    const allowed = getAllowedOrigins();
    console.log('Allowed CORS origins:', allowed);
    app.enableCors({
        origin: allowed,
        credentials: true,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
        exposedHeaders: ['Authorization'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });
    app.useGlobalPipes(new global_validation_pipe_1.GlobalValidationPipe());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('LabVerse API')
        .setDescription('Complete project management and CRM system API')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
    console.log(`Swagger docs available at: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map