import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";

describe("error boundary", () => {
  it("converts a thrown route error into a 500 response", async () => {
    const testApp = createApp((app) => {
      app.get("/boom", () => {
        throw new Error("boom");
      });
    });

    const response = await request(testApp).get("/boom");

    expect(response.status).toBe(500);
    expect(response.headers["content-type"]).toContain(
      "application/problem+json",
    );
    expect(response.body).toEqual({
      type: "about:blank",
      title: "Internal Server Error",
      status: 500,
      detail: "An unexpected error occurred.",
    });
  });
});