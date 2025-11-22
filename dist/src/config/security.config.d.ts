export declare const SecurityConfig: {
    rateLimit: {
        windowMs: number;
        max: number;
        legacyHeaders: boolean;
        standardHeaders: boolean;
    };
    cors: {
        credentials: boolean;
        origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => void;
    };
    helmet: {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: string[];
                styleSrc: string[];
                scriptSrc: string[];
                imgSrc: string[];
            };
        };
        crossOriginOpenerPolicy: {
            policy: string;
        };
    };
    validation: {
        maxStringLength: number;
        maxArrayLength: number;
    };
};
