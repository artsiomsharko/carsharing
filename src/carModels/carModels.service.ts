import CarModels from "./carModels.model";

const carModelsService = {
  getAll(params) {
    return CarModels.find(params);
  },

  create(params) {
    return CarModels.create(params);
  },

  update(id, params) {
    return CarModels.findByIdAndUpdate(id, params, { new: true });
  },

  deleteById(id) {
    return CarModels.deleteOne({ _id: id });
  },
};

export default carModelsService;
