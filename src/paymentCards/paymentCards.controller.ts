import PaymentCardsService from "./paymentCards.service";
import { type ParamsRequest } from "../helpers/types";
import { NextFunction, Response } from "express";

class PaymentCardsController {
  async getAllForDriver(req: ParamsRequest, res: Response, next: NextFunction) {
    try {
      const driverId = req.params.id;
      const card = await PaymentCardsService.getAllForDriver(driverId);

      return res.json(card);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req: ParamsRequest, res: Response, next: NextFunction) {
    try {
      const cardId = req.params.id;
      const card = await PaymentCardsService.getOne(cardId);

      if (!card) {
        throw Error(`Cannot find card with id: ${cardId}`);
      }

      return res.json(card);
    } catch (e) {
      next(e);
    }
  }

  async update(req: ParamsRequest, res: Response, next: NextFunction) {
    try {
      const cardId = req.params.id;
      const params = req.body;

      const updatedCard = await PaymentCardsService.update(cardId, params);

      return res.json(updatedCard);
    } catch (e) {
      next(e);
    }
  }

  async create(req: ParamsRequest, res: Response, next: NextFunction) {
    try {
      const driverId = req.params.id;
      const cardParams = req.body;

      const card = await PaymentCardsService.create({
        driverId,
        ...cardParams,
      });

      return res.json(card);
    } catch (e) {
      next(e);
    }
  }

  async delete(req: ParamsRequest, res: Response, next: NextFunction) {
    try {
      const cardId = req.params.id;
      const deletedCard = await PaymentCardsService.delete(cardId);

      return res.json(deletedCard);
    } catch (e) {
      next(e);
    }
  }
}

export default new PaymentCardsController();
