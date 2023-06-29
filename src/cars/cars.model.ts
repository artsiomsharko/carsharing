import mongoose from "mongoose";

const { Schema } = mongoose;

const pointSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    validate: {
      validator(arr) {
        return Array.isArray(arr) && arr.length === 2;
      },
      message: "location.coordinates should be array of 2 numbers",
    },
    required: true,
  },
});

const CarsSchema = new Schema({
  vin: {
    type: String,
    unique: true,
    required: true,
  },
  registrationNumber: {
    type: String,
    unique: true,
    required: true,
  },
  status: {
    type: String,
    default: "unavailable",
    enum: ["unavailable", "in-service", "in-use", "free", "reserved"],
    required: false,
  },
  fuelLevel: {
    type: Number,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  productionInfoId: {
    type: Schema.Types.ObjectId,
    ref: "CarModels",
    required: true,
  },
  currentRunId: {
    type: Schema.Types.ObjectId,
    ref: "Runs",
    default: null,
    required: false,
  },
  location: {
    type: pointSchema,
    required: true,
  },
});

export default mongoose.model("Cars", CarsSchema);
