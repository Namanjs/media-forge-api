import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().int().min(1).max(65535).default(3000),
    // z.coerce.number() converts "4000" into 4000
});

function parseEnv(input: NodeJS.ProcessEnv) {
    const parsed = envSchema.safeParse(input);

    if (!parsed.success) {
        throw new Error(
            `Invalid environment configuration: ${parsed.error.message}`,
        );
    }

    return {
        port: parsed.data.PORT,
    }
}

const env = parseEnv(process.env);

export { env, parseEnv };
//env.port is a validated number