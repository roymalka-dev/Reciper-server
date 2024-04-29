import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Reciper API",
      version: "1.0.0",
      description: "A simple API to get started with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/endpoints/*.ts"],
  paths: {},
};

export const swaggerSpec = swaggerJsdoc(options);
