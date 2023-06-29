import { Router } from "express";
import runsController from "./runs.controller";
import validateObjectId from "../middlewares/objectId";

const router = Router();

router.get("/car/:id", validateObjectId, runsController.getAllForCar);
router.get("/:id", validateObjectId, runsController.getOne);

router.post("/", runsController.create);

router.put("/:id", validateObjectId, runsController.update);

router.delete("/:id", validateObjectId, runsController.delete);

export default router;
