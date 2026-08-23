import express, { type Express } from "express";
import { errorHandler } from "./http/error-handler.js";
import { notFoundHandler } from "./http/not-found-handler.js";

type RouteRegistrar = (app: Express) => void;

const registerProductionRoutes: RouteRegistrar = (app) => {
  app.get("/health", (_request, response) => {
    response.status(200).json({ status: "ok" });
  });
};

function createApp(
  registerRoutes: RouteRegistrar = registerProductionRoutes,
) {
  const app = express();

  registerRoutes(app);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

const app = createApp();

export { app, createApp };