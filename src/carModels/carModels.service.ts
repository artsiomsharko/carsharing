import { Types } from "mongoose";
import CarModels, { CarModel } from "./carModels.model";

const carModelsService = {
  getAll(params: Partial<CarModel>) {
    return CarModels.find(params);
  },

  create(params: CarModel) {
    return CarModels.create(params);
  },

  update(id: Types.ObjectId, params: Partial<CarModel>) {
    return CarModels.findByIdAndUpdate(id, params, { new: true });
  },

  deleteById(id: Types.ObjectId) {
    return CarModels.deleteOne({ _id: id });
  },
};

export default carModelsService;
