import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const port = process.env.LOCAL_PORT || process.env.PORT;

function createSwaggerConfig() {
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
    apis: ["./**/*.routes.ts", "./**/*.model.ts", "./**/mongoSchemas.ts"],
  };

  return swaggerJsdoc(options);
}

export function applySwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(createSwaggerConfig()));
}
