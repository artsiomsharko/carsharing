import PaymentCards from "./paymentCards.model";

const paymentCardsService = {
  getOne(id) {
    return PaymentCards.findById(id);
  },

  getAllForDriver(driverId) {
    return PaymentCards.find({ driverId });
  },

  create(params) {
    return PaymentCards.create(params);
  },

  update(id, params) {
    return PaymentCards.findByIdAndUpdate(id, params, { new: true });
  },

  delete(id) {
    return PaymentCards.findByIdAndDelete(id);
  },

  deleteAllForDriver(driverId) {
    return PaymentCards.deleteMany({ driverId });
  },
};

export default paymentCardsService;
