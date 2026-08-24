import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().int().min(1).max(65535).default(3000),
    DATABASE_URL: z.url(),
});

type AppEnv = {
    port: number;
    databaseUrl: string;
}

function parseEnv(input: NodeJS.ProcessEnv): AppEnv {
    const parsed = envSchema.safeParse(input);

    if (!parsed.success) {
        throw new Error(
            `Invalid environment configuration: ${parsed.error.message}`,
        );
    }

    return {
        port: parsed.data.PORT,
        databaseUrl: parsed.data.DATABASE_URL,
    };
}

function loadEnv(): AppEnv {
    return parseEnv(process.env);
}

export { loadEnv, parseEnv };
