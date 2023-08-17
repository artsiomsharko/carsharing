import request from "supertest";
import express from "express";
import errorMiddleware from "../error";

const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  const { error } = req.query;

  if (error) {
    next(new Error(error as string));
  } else {
    res.sendStatus(200);
  }
});

app.use(errorMiddleware);

describe("errorMiddleware", () => {
  it("should handle an Error object", async () => {
    const errorMessage = "Test error message";
    const response = await request(app).get(`/?error=${errorMessage}`);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: errorMessage });
  });

  it("should pass without an Error object", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
  });
});
