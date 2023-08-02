import { Types } from "mongoose";
import CarsService from "../cars/cars.service";
import Runs, { Run } from "./runs.model";

const runsService = {
  getOne(id: Types.ObjectId) {
    return Runs.findById(id);
  },

  getAllForCar(carId: Types.ObjectId) {
    return Runs.find({ carId });
  },

  create(params: Run) {
    return Runs.create(params);
  },

  update(id: Types.ObjectId, params: Partial<Run>) {
    return Runs.findByIdAndUpdate(id, params, { new: true });
  },

  async delete(id: Types.ObjectId) {
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

export default runsService;
