"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeLogger = void 0;
const common_1 = require("@nestjs/common");
const security_util_1 = require("./security.util");
class SafeLogger extends common_1.Logger {
    static log(message, context) {
        const sanitizedMessage = typeof message === 'string'
            ? security_util_1.SecurityUtil.sanitizeLogMessage(message)
            : message;
        super.log(sanitizedMessage, context);
    }
    static error(message, trace, context) {
        const sanitizedMessage = typeof message === 'string'
            ? security_util_1.SecurityUtil.sanitizeLogMessage(message)
            : message;
        const sanitizedTrace = trace
            ? security_util_1.SecurityUtil.sanitizeLogMessage(trace)
            : trace;
        super.error(sanitizedMessage, sanitizedTrace, context);
    }
    static warn(message, context) {
        const sanitizedMessage = typeof message === 'string'
            ? security_util_1.SecurityUtil.sanitizeLogMessage(message)
            : message;
        super.warn(sanitizedMessage, context);
    }
    static debug(message, context) {
        if (process.env.NODE_ENV !== 'production') {
            const timestamp = new Date().toISOString();
            const contextStr = context ? `[${context}] ` : '';
            console.debug(`${timestamp} ${contextStr}DEBUG: ${message}`);
        }
    }
}
exports.SafeLogger = SafeLogger;
//# sourceMappingURL=logger.util.js.map