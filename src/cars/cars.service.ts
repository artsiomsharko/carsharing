import { Types } from "mongoose";
import { CarModel } from "../carModels/carModels.model";
import CarModelsService from "../carModels/carModels.service";
import Cars, { Car } from "./cars.model";

const carsService = {
  getOne(params: Partial<Car>) {
    return Cars.findOne(params);
  },

  getOneById(id: Types.ObjectId) {
    return Cars.findById(id).populate("productionInfoId");
  },

  getAll() {
    return Cars.find().populate("productionInfoId");
  },

  getLowFuelInUse() {
    return Cars.find({ status: "in-use", fuelLevel: { $lt: 25 } });
  },

  getReservedUnauthorized() {
    const cars = Cars.aggregate([
      {
        $match: {
          status: "reserved",
          currentRunId: { $ne: null },
        },
      },
      {
        $lookup: {
          from: "runs",
          localField: "currentRunId",
          foreignField: "_id",
          as: "currentRun",
        },
      },
      {
        $addFields: {
          currentRun: { $arrayElemAt: ["$currentRun", 0] },
        },
      },
      {
        $lookup: {
          from: "drivers",
          localField: "currentRun.driverId",
          foreignField: "_id",
          as: "driver",
        },
      },
      {
        $addFields: {
          driver: { $arrayElemAt: ["$driver", 0] },
        },
      },
      {
        $lookup: {
          from: "paymentscards",
          localField: "driver._id",
          foreignField: "driverId",
          as: "cards",
        },
      },
      {
        $match: {
          "cards.0": { $exists: false },
        },
      },
      {
        $project: {
          vin: 1,
          location: 1,
          "driver.firstName": 1,
          "driver.lastName": 1,
          "driver.licenseNumber": 1,
        },
      },
    ]);

    return cars;
  },

  async create(params: Car & { productionInfo?: CarModel }) {
    let productionInfo = null;

    try {
      if (!params.productionInfoId && params.productionInfo) {
        productionInfo = await CarModelsService.create(params.productionInfo);
      }

      const car = await Cars.create({
        productionInfoId: productionInfo?._id,
        ...params,
      });

      return car.populate("productionInfoId");
    } catch (e) {
      productionInfo && productionInfo.deleteOne();
      throw e;
    }
  },

  async update(
    id: Types.ObjectId,
    params: Partial<Car & { productionInfo?: CarModel }>
  ) {
    const car = await Cars.findByIdAndUpdate(id, params, { new: true });

    if (!params.productionInfoId && params.productionInfo) {
      car.productionInfoId = await (CarModelsService.update(
        car.productionInfoId,
        params.productionInfo
      ) as any);
    }

    return car;
  },

  async moveOldInService() {
    const oldModelIds = (
      await CarModelsService.getAll({
        date: { $lt: new Date("2017-01-01") } as any,
      })
    ).map((c) => c._id);

    return Cars.updateMany(
      {
        $or: [
          { productionInfoId: { $in: oldModelIds } },
          { mileage: { $gt: 100000 } },
        ],
      },
      { status: "in-service" }
    );
  },

  async changeLocationForFree() {
    const cars = await Cars.aggregate([
      {
        $match: {
          status: { $nin: ["in-use", "reserved"] },
        },
      },
      {
        $lookup: {
          from: "runs",
          localField: "_id",
          foreignField: "carId",
          as: "runs",
        },
      },
      {
        $match: {
          "runs.2": { $exists: true },
        },
      },
    ]);

    const carIds = cars.map((c) => c._id);

    return Cars.updateMany(
      { _id: { $in: carIds } },
      { location: { coordinates: [53.8882836, 27.5442615] } }
    );
  },

  delete(params: Partial<Car>) {
    return Cars.deleteOne(params);
  },

  async deleteByVin(vin: string) {
    const car = await this.getOne({ vin });

    if (!car) {
      return null;
    }

    if (car.productionInfoId) {
      await CarModelsService.deleteById(car.productionInfoId);
    }

    return car.deleteOne();
  },
};

export default carsService;
