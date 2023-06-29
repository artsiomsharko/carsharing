import { Router } from "express";
import cardsController from "./paymentCards.controller";
import validateObjectId from "../middlewares/objectId";

const router = Router();

router.get("/driver/:id", validateObjectId, cardsController.getAllForDriver);
router.post("/driver/:id", validateObjectId, cardsController.create);

router.get("/:id", validateObjectId, cardsController.getOne);
router.put("/:id", validateObjectId, cardsController.update);
router.delete("/:id", validateObjectId, cardsController.delete);

export default router;
