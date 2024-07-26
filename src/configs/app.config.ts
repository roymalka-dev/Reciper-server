import bodyParser from "body-parser";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { Request, Response } from "express";
import path from "path";

export const appConfig = (app: Application) => {
  app.use((req, res, next) => {
    if (req.path.startsWith("/api/upload")) {
      next();
    } else {
      express.json({ limit: "30mb" })(req, res, next);
    }
  });

  app.use((req, res, next) => {
    if (!req.path.startsWith("/api/upload")) {
      bodyParser.urlencoded({ limit: "30mb", extended: true })(req, res, next);
    } else {
      next();
    }
  });

  app.use(
    "/images",
    express.static(path.join(__dirname, "..", "uploads", "images"))
  );

  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

  app.use(
    cors({
      credentials: true,
      origin: "*",
    })
  );

  /**
   * @openapi
   * /:
   *   get:
   *     summary: Get greeting message
   *     description: This endpoint provides a greeting message from the server.
   *     responses:
   *       200:
   *         description: A plain text greeting message.
   *         content:
   *           text/plain:
   *             schema:
   *               type: string
   *               example: RecipeAI server API
   */
  app.get("/", (req: Request, res: Response) => {
    res.send("RecipeAI server API");
  });

  app.use(morgan("common"));

  //process.env.NODE_ENV === "DEV" &&
};
