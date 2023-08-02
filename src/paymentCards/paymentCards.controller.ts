import PaymentCardsService from "./paymentCards.service";
import { type ParamsRequest } from "../helpers/types";
import { Response } from "express";

class PaymentCardsController {
  async getAllForDriver(req: ParamsRequest, res: Response) {
    try {
      const driverId = req.params.id;
      const card = await PaymentCardsService.getAllForDriver(driverId);

      return res.json(card);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getOne(req: ParamsRequest, res: Response) {
    try {
      const cardId = req.params.id;
      const card = await PaymentCardsService.getOne(cardId);

      if (!card) {
        throw Error(`Cannot find card with id: ${cardId}`);
      }

      return res.json(card);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req: ParamsRequest, res: Response) {
    try {
      const cardId = req.params.id;
      const params = req.body;

      const updatedCard = await PaymentCardsService.update(cardId, params);

      return res.json(updatedCard);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async create(req: ParamsRequest, res: Response) {
    try {
      const driverId = req.params.id;
      const cardParams = req.body;

      const card = await PaymentCardsService.create({
        driverId,
        ...cardParams,
      });

      return res.json(card);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req: ParamsRequest, res: Response) {
    try {
      const cardId = req.params.id;
      const deletedCard = await PaymentCardsService.delete(cardId);

      return res.json(deletedCard);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new PaymentCardsController();
