const PaymentCardsService = require("../paymentCards/paymentCards.service");
const Drivers = require("./drivers.model");

const driversService = {
  getOne(id) {
    return Drivers.findById(id);
  },

  getAll() {
    return Drivers.find();
  },

  create(params) {
    return Drivers.create(params);
  },

  update(id, params) {
    return Drivers.findByIdAndUpdate(id, params, { new: true });
  },

  async delete(id) {
    const deletedDriver = Drivers.findByIdAndDelete(id);

    await PaymentCardsService.deleteAllForDriver(id);

    return deletedDriver;
  },
};

module.exports = driversService;
