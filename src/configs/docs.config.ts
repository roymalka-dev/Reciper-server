import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../documentation/swagger";

export const docsConfig = (app: any) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
