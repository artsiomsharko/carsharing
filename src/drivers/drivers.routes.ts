import { Router } from "express";
import driversController from "./drivers.controller";
import validateObjectId from "../middlewares/objectId";

const router = Router();

router.get("/", driversController.getAll);
router.get("/:id", validateObjectId, driversController.getOne);
router.post("/", driversController.create);
router.put("/:id", validateObjectId, driversController.update);
router.delete("/:id", validateObjectId, driversController.delete);

export default router;
