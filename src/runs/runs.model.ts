import mongoose from "mongoose";

const { Schema } = mongoose;

const RunsSchema = new Schema({
  driverId: {
    type: Schema.Types.ObjectId,
    ref: "Drivers",
    required: true,
  },
  carId: {
    type: Schema.Types.ObjectId,
    ref: "Cars",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  finishFuelLevel: {
    type: Number,
    default: null,
    required: false,
  },
  finishMileage: {
    type: Number,
    default: null,
    required: false,
  },
});

export default mongoose.model("Runs", RunsSchema);
