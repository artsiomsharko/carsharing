import request from "supertest";
import app from "../../index";
import { connectDb } from "../../db";
import { Connection } from "mongoose";
import { mockCar, mockProductionInfo, mockRun } from "./runs.mock";

describe("RunsController", () => {
  let dbConnection: Connection;

  beforeAll(async () => {
    dbConnection = (await connectDb()).connection;
  });

  afterAll(async () => dbConnection.close());

  beforeEach(async () => {
    await dbConnection.collection("runs").deleteMany({});
    await dbConnection.collection("cars").deleteMany({});
  });

  const createMockCar = async () => {
    const response = await request(app)
      .post("/cars")
      .send({ ...mockCar, productionInfo: mockProductionInfo });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      ...mockCar,
      _id: expect.any(String),
      __v: expect.any(Number),
      currentRunId: null,
      productionInfoId: {
        ...mockProductionInfo,
        _id: expect.any(String),
        __v: expect.any(Number),
      },
      location: {
        ...mockCar.location,
        _id: expect.any(String),
      },
    });

    return response.body;
  };

  const createMockRun = async (
    carId: string = mockRun.carId,
    setCurrent = false
  ) => {
    const response = await request(app)
      .post("/runs")
      .send({ ...mockRun, carId, setCurrent });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      _id: expect.any(String),
      __v: expect.any(Number),
      ...mockRun,
      carId: carId,
    });

    return response.body;
  };

  describe("GET /runs/car/:id", () => {
    it("should return an empty array of runs for the car when they not created", async () => {
      const response = await request(app).get(`/runs/car/${mockRun.carId}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(0);
    });

    it("should return array of 2 created runs for the car", async () => {
      const carId = (await createMockCar())._id;

      await createMockRun(carId);
      await createMockRun(carId);

      const response = await request(app).get(`/runs/car/${carId}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0]._id).not.toBe(response.body[1]._id);
    });
  });

  describe("GET /runs/:id", () => {
    it("should get run and return 200", async () => {
      const createdRunId = (await createMockRun())._id;

      const response = await request(app).get(`/runs/${createdRunId}`);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        _id: createdRunId,
        __v: expect.any(Number),
        ...mockRun,
      });
    });

    it("should try to get not existing run and return 400", async () => {
      const runId = "aaaaaa5e4681bbd0910bfcaa";
      const response = await request(app).get(`/runs/${runId}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(`Cannot find run with id: ${runId}`);
    });
  });

  describe("POST /runs", () => {
    it("should create a new run", async () => {
      const response = await request(app).post(`/runs`).send(mockRun);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        _id: expect.any(String),
        __v: expect.any(Number),
        ...mockRun,
      });
    });

    it("should create a new run with setCurrent flag and set this run for the car as current", async () => {
      const carId = (await createMockCar())._id;

      const runResponse = await request(app)
        .post(`/runs`)
        .send({ ...mockRun, carId, setCurrent: true });

      const carResponse = await request(app).get(`/cars/${carId}`);

      expect(runResponse.status).toBe(200);
      expect(carResponse.status).toBe(200);
      expect(carResponse.body.currentRunId).toBe(runResponse.body._id);
    });
  });

  describe("PUT /runs/:id", () => {
    it("should update run by id", async () => {
      const createdRunId = (await createMockRun())._id;

      const updatedValues = {
        startDate: "2025-11-25T12:00:00.000Z",
        finishFuelLevel: 10,
        finishMileage: 6800,
      };

      const response = await request(app)
        .put(`/runs/${createdRunId}`)
        .send(updatedValues);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        _id: createdRunId,
        __v: expect.any(Number),
        ...mockRun,
        ...updatedValues,
      });
    });

    it("should try to update not existing run and return 400", async () => {
      const runId = "aaaaaaaa4681bbd0910bfcaa";
      const response = await request(app).put(`/runs/${runId}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(`Cannot find run with id: ${runId}`);
    });
  });

  describe("DELETE /runs/:id", () => {
    it("should delete run by id", async () => {
      const createdRunId = (await createMockRun())._id;

      const response = await request(app).del(`/runs/${createdRunId}`);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        _id: createdRunId,
        __v: expect.any(Number),
        ...mockRun,
      });
    });

    it("should set null to currentRunId for the car with this deleted run", async () => {
      const createdCar = await createMockCar();
      const createdRunId = (await createMockRun(createdCar._id, true))._id;

      const carResponseBefore = await request(app).get(
        `/cars/${createdCar._id}`
      );
      expect(carResponseBefore.body.currentRunId).toBe(createdRunId);

      await request(app).del(`/runs/${createdRunId}`);
      const carResponse = await request(app).get(`/cars/${createdCar._id}`);

      expect(carResponse.body.currentRunId).toBe(null);
    });
  });
});
