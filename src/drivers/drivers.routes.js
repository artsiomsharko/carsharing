const { Router } = require("express");
const driversController = require("./drivers.controller");
const validateObjectId = require("../middlewares/objectId");

const router = new Router();

router.get("/:id", validateObjectId, driversController.getOne);
router.post("/", driversController.create);
router.put("/:id", validateObjectId, driversController.update);
router.delete("/:id", validateObjectId, driversController.delete);

module.exports = router;
