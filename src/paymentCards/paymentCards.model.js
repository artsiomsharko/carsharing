const mongoose = require("mongoose");

const { Schema } = mongoose;

const PaymentsCardsSchema = new Schema({
  driverId: { type: Schema.Types.ObjectId, ref: "Drivers", required: true },
  number: { type: Number, required: true },
  owner: { type: String, required: true },
  validThrough: { type: Date, required: true },
});

module.exports = mongoose.model("PaymentsCards", PaymentsCardsSchema);
