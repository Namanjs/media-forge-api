import { Pool } from "pg";

function createPool(databaseUrl: string): Pool {
    return new Pool({
        connectionString: databaseUrl,
    });
}

export { createPool };