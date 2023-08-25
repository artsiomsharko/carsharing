import request from "supertest";
import app from "../../index";
import { connectDb } from "../../db";
import { Connection } from "mongoose";

const mockDriver = {
  licenseNumber: "A123457896TEST",
  firstName: "John",
  lastName: "Mock",
};

describe("DriversController", () => {
  let dbConnection: Connection;

  beforeAll(async () => {
    dbConnection = (await connectDb()).connection;
  });

  afterAll(async () => dbConnection.close());

  beforeEach(async () => {
    await dbConnection.collection("drivers").deleteMany({});
    await dbConnection.collection("paymentscards").deleteMany({});
  });

  const createMockDriver = async () => {
    const response = await request(app).post("/drivers").send(mockDriver);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      _id: expect.any(String),
      __v: expect.any(Number),
      ...mockDriver,
    });

    return response.body;
  };

  describe("GET /drivers", () => {
    it("should return an empty array of drivers when they not created", async () => {
      const response = await request(app).get(`/drivers`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(0);
    });

    it("should return array of 2 created drivers", async () => {
      await createMockDriver();
      await createMockDriver();

      const response = await request(app).get(`/drivers`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0]._id).not.toBe(response.body[1]._id);
    });
  });

  describe("GET /drivers/:id", () => {
    it("should get driver and return 200", async () => {
      const createdDriverId = (await createMockDriver())._id;

      const response = await request(app).get(`/drivers/${createdDriverId}`);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        _id: createdDriverId,
        __v: expect.any(Number),
        ...mockDriver,
      });
    });

    it("should try to get not existing driver and return 400", async () => {
      const driverId = "aa9ae65e4681bbd0910bfcaa";
      const response = await request(app).get(`/drivers/${driverId}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        `Cannot find driver with id: ${driverId}`
      );
    });
  });

  describe("POST /drivers", () => {
    it("should create a new driver", async () => {
      const response = await request(app).post(`/drivers`).send(mockDriver);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        _id: expect.any(String),
        __v: expect.any(Number),
        ...mockDriver,
      });
    });
  });

  describe("PUT /drivers/:id", () => {
    it("should update driver by id", async () => {
      const createdDriverId = (await createMockDriver())._id;

      const updatedValues = {
        licenseNumber: "A123457896TEST1V2",
        firstName: "JohnUpdated",
      };

      const response = await request(app)
        .put(`/drivers/${createdDriverId}`)
        .send(updatedValues);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        _id: createdDriverId,
        __v: expect.any(Number),
        ...mockDriver,
        ...updatedValues,
      });
    });
  });

  describe("DELETE /drivers/:id", () => {
    it("should delete driver", async () => {
      const createdDriverId = (await createMockDriver())._id;

      const response = await request(app).del(`/drivers/${createdDriverId}`);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        _id: createdDriverId,
        __v: expect.any(Number),
        ...mockDriver,
      });
    });

    it("should delete all payment cards of the deleted driver", async () => {
      const createdDriverId = (await createMockDriver())._id;

      const createPaymentCard = async () => {
        const response = await request(app)
          .post(`/cards/driver/${createdDriverId}`)
          .send({
            number: 1234567890123456,
            owner: "John Doe",
            validThrough: "2026-05-24T21:00:00.000Z",
          });

        expect(response.status).toBe(200);

        return response.body;
      };

      await createPaymentCard();
      await createPaymentCard();

      const cardsResponseBefore = await request(app).get(
        `/cards/driver/${createdDriverId}`
      );

      expect(cardsResponseBefore.body.length).toBe(2);

      await request(app).del(`/drivers/${createdDriverId}`);
      const cardsResponseAfter = await request(app).get(
        `/cards/driver/${createdDriverId}`
      );

      expect(cardsResponseAfter.body.length).toBe(0);
    });
  });
});
