import { Router } from "express";
import carsRouter from "./cars/cars.routes";
import driversRouter from "./drivers/drivers.routes";
import cardsRouter from "./paymentCards/paymentCards.routes";
import runsRouter from "./runs/runs.routes";

const router = Router();

router.use("/cars", carsRouter);
router.use("/runs", runsRouter);
router.use("/drivers", driversRouter);
router.use("/cards", cardsRouter);

export default router;
