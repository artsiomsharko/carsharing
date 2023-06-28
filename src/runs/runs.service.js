const CarsService = require("../cars/cars.service");
const Runs = require("./runs.model");

const runsService = {
  getOne(id) {
    return Runs.findById(id);
  },

  getAllForCar(carId) {
    return Runs.find({ carId });
  },

  create(params) {
    return Runs.create(params);
  },

  update(id, params) {
    return Runs.findByIdAndUpdate(id, params, { new: true });
  },

  async delete(id) {
    const run = await Runs.findById(id);

    if (!run) {
      return null;
    }

    const carWithThisRun = await CarsService.getOne({ currentRunId: run._id });

    if (carWithThisRun) {
      carWithThisRun.currentRunId = null;
      await carWithThisRun.save();
    }

    return run;
  },
};

module.exports = runsService;
