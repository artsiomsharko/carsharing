import request from "supertest";
import express from "express";
import objectIdMiddleware from "../objectId";

const app = express();

app.use(express.json());

app.get("/:id", objectIdMiddleware, (req, res) => {
  res.sendStatus(200);
});

describe("objectIdMiddleware", () => {
  it("should pass valid ObjectId", async () => {
    const response = await request(app).get("/649ae65e4681bbd0910bfc62");

    expect(response.status).toBe(200);
  });

  it("should handle invalid ObjectId", async () => {
    const response = await request(app).get("/123123");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid ObjectId param: 123123",
    });
  });
});
