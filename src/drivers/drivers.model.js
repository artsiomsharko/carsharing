const mongoose = require("mongoose");

const { Schema } = mongoose;

const DriversSchema = new Schema({
  licenseNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

module.exports = mongoose.model("Drivers", DriversSchema);
