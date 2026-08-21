import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";

describe("Media Forge app", () => {
  it("returns service health", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "ok",
    });
  });

  it("returns problem details for an unknown route", async () => {
    const response = await request(app).get("/does-not-exist");

    expect(response.status).toBe(404);
    expect(response.headers["content-type"]).toContain(
      "application/problem+json",
    );
    expect(response.body).toEqual({
      type: "about:blank",
      title: "Not Found",
      status: 404,
      detail: "The requested route does not exist.",
    });
  });
});