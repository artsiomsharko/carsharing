import mongoose from "mongoose";

const { Schema } = mongoose;

const CarModelsSchema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model("CarModels", CarModelsSchema);
