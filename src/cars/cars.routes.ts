import { Router } from "express";
import carsController from "./cars.controller";
import validateObjectId from "../middlewares/objectId";

const router = Router();

router.get("/", carsController.getAll);
router.get("/low-fuel", carsController.getLowFuelInUse);
router.get("/reserved-unauthorized", carsController.getReservedUnauthorized);
router.get("/:id", validateObjectId, carsController.getOne);

router.post("/", carsController.create);

router.put("/old-in-service", carsController.moveOldInService);
router.put("/relocate-free", carsController.changeLocationForFree);
router.put("/:id", validateObjectId, carsController.update);

router.delete("/:vin", carsController.deleteByVin);

export default router;
