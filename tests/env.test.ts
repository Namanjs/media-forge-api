import { describe, expect, it } from "vitest";
import { parseEnv } from "../src/config/env.js";

describe("parseEnv", () => {
  it("defaults PORT to 3000 when missing", () => {
    expect(parseEnv({}).port).toBe(3000);
  });

  it("converts PORT from a string to a number", () => {
    expect(parseEnv({ PORT: "4000" }).port).toBe(4000);
  });

  it("rejects an invalid PORT", () => {
    expect(() => parseEnv({ PORT: "abc" })).toThrow(
      /Invalid environment configuration/,
    );
  });
});