const CarModels = require("./carModels.model");

const carModelsService = {
  getAll() {
    return CarModels.find();
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

module.exports = carModelsService;
