const { Router } = require("express");
const cardsController = require("./paymentCards.controller");
const validateObjectId = require("../middlewares/objectId");

const router = new Router();

router.get("/driver/:id", validateObjectId, cardsController.getAllForDriver);
router.post("/driver/:id", validateObjectId, cardsController.create);

router.get("/:id", validateObjectId, cardsController.getOne);
router.put("/:id", validateObjectId, cardsController.update);
router.delete("/:id", validateObjectId, cardsController.delete);

module.exports = router;
