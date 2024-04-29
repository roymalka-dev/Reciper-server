import request from "supertest";
import express from "express";
import { routerConfig } from "../../routes/router";
import { routes } from "../../routes/routes";
import { appConfig } from "../../configs/app.config";
import { DBconnection, closeDBConnection } from "../../db/db";

describe("Express App", () => {
  const app = express();

  beforeAll(async () => {
    appConfig(app);
    await DBconnection();
    routerConfig("/api", app, routes);
  });

  afterAll(async () => {
    await closeDBConnection();
  });

  it("responds with 404 for unknown routes", async () => {
    const response = await request(app).get("/api/unknown-route");
    expect(response.status).toBe(404);
  });

  it("responds with 200 for /api/auth/sign-in", async () => {
    const response = await request(app)
      .post("/api/auth/sign-in")
      .send({ email: "test@gmail.com", password: "" });
    expect(response.status).toBe(400);
  });

  it("responds with 200 for /api/auth/sign-in", async () => {
    const response = await request(app)
      .post("/api/auth/sign-in")
      .send({ email: "test@gmail.com", password: "12345678" });

    expect(response.status).toBe(200);
  });

  it("responds with 404 for non-existing image in /api/get-image", async () => {
    const response = await request(app).get(
      "/api/get-image/non-existing-image.jpg"
    );
    expect(response.status).toBe(404);
  });
});
