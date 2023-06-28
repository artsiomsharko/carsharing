const mongoose = require("mongoose");

const { Schema } = mongoose;

const CarModelsSchema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("CarModels", CarModelsSchema);
