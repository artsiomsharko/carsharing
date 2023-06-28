const CarModelsService = require("../carModels/carModels.service");
const Cars = require("./cars.model");

const carsService = {
  getOne(params) {
    return Cars.findOne(params);
  },

  getOneById(id) {
    return Cars.findById(id).populate("productionInfoId");
  },

  getAll() {
    return Cars.find()
      .populate("productionInfoId")
      .distinct("productionInfoId", "model");
  },

  getInUseWithLowFuel() {
    return Cars.find({ status: "in-use", fuelLevel: { $lt: 25 } });
  },

  async create(params) {
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

  async update(id, params) {
    const car = await Cars.findByIdAndUpdate(id, params, { new: true });

    if (!params.productionInfoId && params.productionInfo) {
      car.productionInfoId = await CarModelsService.update(
        car.productionInfoId,
        params.productionInfo
      );
    }

    return car;
  },

  delete(params) {
    return Cars.deleteOne(params);
  },

  async deleteByVin(vin) {
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

module.exports = carsService;
