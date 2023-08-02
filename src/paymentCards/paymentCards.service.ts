import { Types } from "mongoose";
import PaymentCards, { PaymentCard } from "./paymentCards.model";

const paymentCardsService = {
  getOne(id: Types.ObjectId) {
    return PaymentCards.findById(id);
  },

  getAllForDriver(driverId: Types.ObjectId) {
    return PaymentCards.find({ driverId });
  },

  create(params: PaymentCard) {
    return PaymentCards.create(params);
  },

  update(id: Types.ObjectId, params: Partial<PaymentCard>) {
    return PaymentCards.findByIdAndUpdate(id, params, { new: true });
  },

  delete(id: Types.ObjectId) {
    return PaymentCards.findByIdAndDelete(id);
  },

  deleteAllForDriver(driverId: Types.ObjectId) {
    return PaymentCards.deleteMany({ driverId });
  },
};

export default paymentCardsService;
