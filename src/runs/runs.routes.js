const { Router } = require("express");
const runsController = require("./runs.controller");
const validateObjectId = require("../middlewares/objectId");

const router = new Router();

router.get("/car/:id", validateObjectId, runsController.getAllForCar);
router.get("/:id", validateObjectId, runsController.getOne);

router.post("/", runsController.create);

router.put("/:id", validateObjectId, runsController.update);

router.delete("/:id", validateObjectId, runsController.delete);

module.exports = router;
