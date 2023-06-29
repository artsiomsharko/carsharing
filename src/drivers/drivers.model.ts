import mongoose from "mongoose";

const { Schema } = mongoose;

const DriversSchema = new Schema({
  licenseNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

export default mongoose.model("Drivers", DriversSchema);
