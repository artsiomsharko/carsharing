import request from "supertest";
import app from "../../index";
import { connectDb } from "../../db";
import { Connection } from "mongoose";
import {
  mockCarProps,
  mockCarProdInfo,
  mockCarLocation,
  mockRun,
  mockDriver,
  mockPaymentCard,
} from "./cars.mock";

describe("CarsController", () => {
  let dbConnection: Connection;

  beforeAll(async () => {
    dbConnection = (await connectDb()).connection;
  });

  afterAll(async () => dbConnection.close());

  beforeEach(async () => {
    await dbConnection.collection("paymentscards").deleteMany({});
    await dbConnection.collection("runs").deleteMany({});
    await dbConnection.collection("cars").deleteMany({});
    await dbConnection.collection("drivers").deleteMany({});
  });

  const createMockCar = async (
    props: Partial<typeof mockCarProps> = {},
    prodDate: string = mockCarProdInfo.date
  ) => {
    const mockCar = {
      ...mockCarProps,
      ...props,
      productionInfo: {
        ...mockCarProdInfo,
        date: prodDate,
      },
      location: mockCarLocation,
    };

    const response = await request(app).post("/cars").send(mockCar);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      _id: expect.any(String),
      __v: expect.any(Number),
      ...mockCarProps,
      ...props,
      productionInfoId: {
        ...mockCarProdInfo,
        date: prodDate,
        _id: expect.any(String),
        __v: expect.any(Number),
      },
      location: {
        ...mockCarLocation,
        _id: expect.any(String),
      },
    });

    return response.body;
  };

  const createMockRun = async (
    setCurrent = false,
    additional?: Partial<typeof mockRun>
  ) => {
    const response = await request(app)
      .post("/runs")
      .send({ ...mockRun, ...additional, setCurrent });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      _id: expect.any(String),
      __v: expect.any(Number),
      ...mockRun,
      ...additional,
    });

    return response.body;
  };

  describe("GET /cars", () => {
    it("should return an empty array of cars when they not created", async () => {
      const response = await request(app).get(`/cars`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(0);
    });

    it("should return array of 2 created cars", async () => {
      await createMockCar({ vin: "VIN1", registrationNumber: "0001AB-7" });
      await createMockCar({ vin: "VIN2", registrationNumber: "0002AB-7" });

      const response = await request(app).get(`/cars`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });
  });

  describe("POST /cars", () => {
    it("should create a new car", async () => {
      const response = await request(app)
        .post(`/cars`)
        .send({
          ...mockCarProps,
          productionInfoId: "649b203746ae3152343caaaa",
          location: {
            type: "Point",
            coordinates: [24.12312355, 35.31231231],
          },
        });

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        ...mockCarProps,
        _id: expect.any(String),
        __v: expect.any(Number),
        productionInfoId: null,
        currentRunId: null,
        location: {
          type: "Point",
          coordinates: [24.12312355, 35.31231231],
          _id: expect.any(String),
        },
      });
    });

    it("should create a new car with new production info", async () => {
      const response = await request(app)
        .post(`/cars`)
        .send({
          ...mockCarProps,
          productionInfo: mockCarProdInfo,
          location: {
            type: "Point",
            coordinates: [24.12312355, 35.31231231],
          },
        });

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        ...mockCarProps,
        _id: expect.any(String),
        __v: expect.any(Number),
        productionInfoId: {
          ...mockCarProdInfo,
          _id: expect.any(String),
          __v: expect.any(Number),
        },
        currentRunId: null,
        location: {
          type: "Point",
          coordinates: [24.12312355, 35.31231231],
          _id: expect.any(String),
        },
      });
    });
  });

  describe("GET /cars/:id", () => {
    it("should return car", async () => {
      const createdCar = await createMockCar();

      const response = await request(app).get(`/cars/${createdCar._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        _id: createdCar._id,
        __v: expect.any(Number),
        ...createdCar,
      });
    });

    it("should try to get not existing car and return 400", async () => {
      const carId = "aaaaaa5e4681bbd0910bfcaa";
      const response = await request(app).get(`/cars/${carId}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(`Cannot find car with id: ${carId}`);
    });
  });

  describe("PUT /cars/:id", () => {
    it("should update car by id", async () => {
      const createdCar = await createMockCar();

      const updatedValues = {
        vin: "VIN2POST555",
        registrationNumber: "1007AM-7",
        status: "reserved",
        fuelLevel: 50,
        mileage: 35500,
        location: {
          type: "Point",
          coordinates: [22.12312355, 41.31231231],
        },
      };

      const updatedProdInfo = {
        model: "M3",
      };

      const response = await request(app)
        .put(`/cars/${createdCar._id}`)
        .send({ ...updatedValues, productionInfo: updatedProdInfo });

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        _id: createdCar._id,
        __v: expect.any(Number),
        ...createdCar,
        ...updatedValues,
        productionInfoId: {
          ...createdCar.productionInfoId,
          ...updatedProdInfo,
        },
        location: {
          ...createdCar.location,
          ...updatedValues.location,
          _id: expect.any(String),
        },
      });
    });

    it("should try to update not existing car and return 400", async () => {
      const carId = "aaaaaaaa4681bbd0910bfcaa";
      const response = await request(app).put(`/cars/${carId}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(`Cannot find car with id: ${carId}`);
    });
  });

  describe("DELETE /cars/:vin", () => {
    it("should delete car by VIN number", async () => {
      const createdCar = await createMockCar();

      const response = await request(app).del(`/cars/${createdCar.vin}`);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        _id: createdCar._id,
        __v: expect.any(Number),
        ...createdCar,
      });
    });

    it("should try to delete not existing car and return 400", async () => {
      const carVin = "undefinedVin";
      const response = await request(app).del(`/cars/${carVin}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(`Cannot find car with VIN: ${carVin}`);
    });
  });

  describe("GET /cars/low-fuel", () => {
    it("should return an array of cars in-use and with fuel level < 25", async () => {
      await createMockCar({
        vin: "VIN1",
        registrationNumber: "0001AB-7",
        status: "in-use",
        fuelLevel: 30,
      });
      await createMockCar({
        vin: "VIN2",
        registrationNumber: "0002AB-7",
        status: "reserved",
        fuelLevel: 10,
      });
      const lowFuelCarId = (
        await createMockCar({
          vin: "VIN3",
          registrationNumber: "0003AB-7",
          status: "in-use",
          fuelLevel: 15,
        })
      )._id;

      const response = await request(app).get(`/cars/low-fuel`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0]._id).toBe(lowFuelCarId);
    });
  });

  describe("GET /cars/reserved-unauthorized", () => {
    const createMockDriver = async () => {
      return (await request(app).post("/drivers").send(mockDriver)).body;
    };
    const createMockCard = async (driverId: string) => {
      return (
        await request(app)
          .post(`/cards/driver/${driverId}`)
          .send(mockPaymentCard)
      ).body;
    };

    it("should return an array with reserved car with unauthorized driver", async () => {
      const driverWithoutCard = await createMockDriver();

      const car = await createMockCar({ status: "reserved" });
      await createMockRun(true, {
        carId: car._id,
        driverId: driverWithoutCard._id,
      });

      const response = await request(app).get(`/cars/reserved-unauthorized`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toMatchObject({
        _id: car._id,
        vin: car.vin,
        location: car.location,
        driver: {
          licenseNumber: driverWithoutCard.licenseNumber,
          firstName: driverWithoutCard.firstName,
          lastName: driverWithoutCard.lastName,
        },
      });
    });

    it("should return an empty array for not reserved car with unauthorized driver", async () => {
      const driverWithoutCard = await createMockDriver();

      const car = await createMockCar({ status: "in-use" });
      await createMockRun(true, {
        carId: car._id,
        driverId: driverWithoutCard._id,
      });

      const response = await request(app).get(`/cars/reserved-unauthorized`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(0);
    });

    it("should return an empty array for reserved car without current run", async () => {
      await createMockCar({ status: "reserved" });

      const response = await request(app).get(`/cars/reserved-unauthorized`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(0);
    });

    it("should return an empty array for reserved car with auth driver", async () => {
      const driverWithCard = await createMockDriver();
      await createMockCard(driverWithCard._id);

      const car = await createMockCar({ status: "reserved" });
      await createMockRun(true, {
        carId: car._id,
        driverId: driverWithCard._id,
      });

      const response = await request(app).get(`/cars/reserved-unauthorized`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(0);
    });
  });

  describe("PUT /cars/old-in-service", () => {
    it("should update any car has mileage greater than 100000 km by setting Status to In Service", async () => {
      const carId = (
        await createMockCar(
          {
            status: "in-use",
            mileage: 130500,
          },
          "2022-02-14T00:00:00.000Z"
        )
      )._id;

      const putResponse = await request(app).put(`/cars/old-in-service`);

      expect(putResponse.status).toBe(200);
      expect(putResponse.body.modifiedCount).toBe(1);

      const carResponse = await request(app).get(`/cars/${carId}`);

      expect(carResponse.body.status).toBe("in-service");
    });

    it("should update any car produced before '01/01/2017' by setting Status to In Service", async () => {
      const carId = (
        await createMockCar(
          {
            status: "in-use",
            mileage: 90500,
          },
          "2016-02-14T00:00:00.000Z"
        )
      )._id;

      const putResponse = await request(app).put(`/cars/old-in-service`);

      expect(putResponse.status).toBe(200);
      expect(putResponse.body.modifiedCount).toBe(1);

      const carResponse = await request(app).get(`/cars/${carId}`);

      expect(carResponse.body.status).toBe("in-service");
    });

    it("should not update any car produced after '01/01/2017' and with mileage less then 100000", async () => {
      await createMockCar(
        {
          status: "in-use",
          mileage: 90500,
        },
        "2023-02-14T00:00:00.000Z"
      );

      const putResponse = await request(app).put(`/cars/old-in-service`);

      expect(putResponse.status).toBe(200);
      expect(putResponse.body.modifiedCount).toBe(0);
    });
  });

  describe("PUT /cars/relocate-free", () => {
    it("should update location for any car that has been booked more than 2 times and aren't In use or Reserved", async () => {
      const carId = (
        await createMockCar({
          status: "free",
        })
      )._id;

      await createMockRun(false, { carId });
      await createMockRun(false, { carId });
      await createMockRun(false, { carId });

      const putResponse = await request(app).put(`/cars/relocate-free`);

      expect(putResponse.status).toBe(200);
      expect(putResponse.body.modifiedCount).toBe(1);

      const carResponse = await request(app).get(`/cars/${carId}`);

      expect(carResponse.body.location.coordinates).toEqual([
        53.8882836, 27.5442615,
      ]);
    });

    it("should not update location for any car that has been booked more than 2 times and In use", async () => {
      const carId = (
        await createMockCar({
          status: "in-use",
        })
      )._id;

      await createMockRun(false, { carId });
      await createMockRun(false, { carId });
      await createMockRun(false, { carId });

      const putResponse = await request(app).put(`/cars/relocate-free`);

      expect(putResponse.status).toBe(200);
      expect(putResponse.body.modifiedCount).toBe(0);
    });
    it("should not update location for any car that has been booked more than 2 times and reserved", async () => {
      const carId = (
        await createMockCar({
          status: "reserved",
        })
      )._id;

      await createMockRun(false, { carId });
      await createMockRun(false, { carId });
      await createMockRun(false, { carId });

      const putResponse = await request(app).put(`/cars/relocate-free`);

      expect(putResponse.status).toBe(200);
      expect(putResponse.body.modifiedCount).toBe(0);
    });

    it("should not update location for any car that has been booked 2 times and aren't In use or Reserved", async () => {
      const carId = (
        await createMockCar({
          status: "free",
        })
      )._id;

      await createMockRun(false, { carId });
      await createMockRun(false, { carId });

      const putResponse = await request(app).put(`/cars/relocate-free`);

      expect(putResponse.status).toBe(200);
      expect(putResponse.body.modifiedCount).toBe(0);
    });
  });
});
