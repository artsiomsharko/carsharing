import request from "supertest";
import app from "../../index";
import { connectDb } from "../../db";
import { Connection } from "mongoose";

const mockDriverId = "610fc12a895b480022c6f35a";
const mockPaymentCard = {
  number: 1234567890123456,
  owner: "John Doe",
  validThrough: "2001-05-24T21:00:00.000Z",
};

describe("PaymentCardsController", () => {
  let dbConnection: Connection;

  beforeAll(async () => {
    dbConnection = (await connectDb()).connection;
  });

  beforeEach(async () => {
    await dbConnection.collection("paymentscards").deleteMany({});
  });

  const createPaymentCard = async () => {
    const response = await request(app)
      .post(`/cards/driver/${mockDriverId}`)
      .send(mockPaymentCard);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      _id: expect.any(String),
      __v: expect.any(Number),
      driverId: mockDriverId,
      ...mockPaymentCard,
    });

    return response.body;
  };

  describe("GET /cards/driver/:id", () => {
    beforeAll(async () => {
      try {
        await dbConnection.collection("paymentscards").deleteMany({});
      } catch (e) {
        console.log(e);
      }
    });

    it("should return array of 2 created cards for driver", async () => {
      await createPaymentCard();
      await createPaymentCard();

      const response = await request(app).get(`/cards/driver/${mockDriverId}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0]._id).not.toBe(response.body[1]._id);
    });

    it("should return an empty array of cards for driver when they not created", async () => {
      const response = await request(app).get(`/cards/driver/${mockDriverId}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(0);
    });
  });

  describe("POST /cards/driver/:id", () => {
    beforeAll(async () => {
      await dbConnection.collection("paymentscards").deleteMany({});
    });

    it("should create a new payment card", async () => {
      const response = await request(app)
        .post(`/cards/driver/${mockDriverId}`)
        .send(mockPaymentCard);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        _id: expect.any(String),
        __v: expect.any(Number),
        driverId: mockDriverId,
        ...mockPaymentCard,
      });
    });

    it("should return 400 when card with current id not found", async () => {
      const cardId = "649ae65e4681bbd0910bfc62";
      const response = await request(app).get(`/cards/${cardId}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(`Cannot find card with id: ${cardId}`);
    });
  });

  describe("GET /cards/:id", () => {
    it("should get card and return 200", async () => {
      const createdCardId = (await createPaymentCard())._id;

      const response = await request(app).get(`/cards/${createdCardId}`);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        _id: createdCardId,
        __v: expect.any(Number),
        driverId: mockDriverId,
        ...mockPaymentCard,
      });
    });

    it("should try to get not existing card and return 400", async () => {
      const cardId = "aa9ae65e4681bbd0910bfcaa";
      const response = await request(app).get(`/cards/${cardId}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(`Cannot find card with id: ${cardId}`);
    });
  });

  describe("PUT /cards/:id", () => {
    it("should update payment card", async () => {
      const createdCardId = (await createPaymentCard())._id;

      const updatedValues = {
        driverId: "550fc12a895b480022c6f35a",
        number: 4242424242424242,
        owner: "New Owner",
        validThrough: "2028-05-24T21:00:00.000Z",
      };

      const response = await request(app)
        .put(`/cards/${createdCardId}`)
        .send(updatedValues);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        _id: createdCardId,
        __v: expect.any(Number),
        ...mockPaymentCard,
        ...updatedValues,
      });
    });
  });

  describe("DELETE /cards/:id", () => {
    it("should delete payment card", async () => {
      const createdCardId = (await createPaymentCard())._id;

      const response = await request(app).del(`/cards/${createdCardId}`);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        _id: createdCardId,
        __v: expect.any(Number),
        driverId: expect.any(String),
        ...mockPaymentCard,
      });
    });
  });
});
