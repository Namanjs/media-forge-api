import { describe, expect, it } from "vitest";
import { parseEnv } from "../src/config/env.js";

const databaseUrl = "postgresql://media_forge_app:local-password@127.0.0.1:5432/media_forge_dev";

describe("parseEnv", () => {
  it("defaults PORT to 3000 when missing", () => {
    const env = parseEnv({ DATABASE_URL: databaseUrl });

    expect(env.port).toBe(3000);
  });

  it("converts PORT from a string to a number", () => {
    const env = parseEnv({
      PORT: "4000",
      DATABASE_URL: databaseUrl,
    });

    expect(env.port).toBe(4000);
  });

  it("rejects an invalid PORT", () => {
    expect(() => parseEnv({
        PORT: "abc",
        DATABASE_URL: databaseUrl,
      }),
    ).toThrow(
      /Invalid environment configuration/,
    );
  });

  it("rejects a missing DATABASE_URL", () => {
    expect(() => parseEnv({})).toThrow(
      /Invalid environment configuration/,
    );
  });
});
