import express from "express";
import http from "http";
import dotenv from "dotenv";
import { appConfig } from "./configs/app.config";
import { socketConfig } from "./configs/socket.config";
import { DBconnection } from "./db/db";
import { docsConfig } from "./configs/docs.config";
import { routes } from "./routes/routes";
import { routerConfig } from "./routes/router";
import { startRedisClient } from "./db/redis";
dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "localhost";

appConfig(app);
socketConfig(server);
docsConfig(app);
routerConfig("/api", app, routes);
startRedisClient();

DBconnection()
  .then(() => {
    server.listen(PORT, HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error(`Error: ${err}`);
  });
