import { Types } from "mongoose";
import PaymentCardsService from "../paymentCards/paymentCards.service";
import Drivers, { Driver } from "./drivers.model";

const driversService = {
  getOne(id: Types.ObjectId) {
    return Drivers.findById(id);
  },

  getAll() {
    return Drivers.find();
  },

  create(params: Driver) {
    return Drivers.create(params);
  },

  update(id: Types.ObjectId, params: Partial<Driver>) {
    return Drivers.findByIdAndUpdate(id, params, { new: true });
  },

  async delete(id: Types.ObjectId) {
    const deletedDriver = Drivers.findByIdAndDelete(id);

    await PaymentCardsService.deleteAllForDriver(id);

    return deletedDriver;
  },
};

export default driversService;
