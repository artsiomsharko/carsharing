import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

function createSwaggerConfig(port: number) {
  const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Carsharing API",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
      },
      servers: [
        {
          url: `http://localhost:${port}`,
        },
      ],
    },
    apis: ["./**/*.routes.ts", "./**/*.model.ts", './**/mongoSchemas.ts'],
  };

  return swaggerJsdoc(options);
}

export function applySwagger(app: Express, port: number) {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(createSwaggerConfig(port))
  );
}
