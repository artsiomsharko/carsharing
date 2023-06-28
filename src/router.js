const { Router } = require("express");
const carsRouter = require("./cars/cars.routes");
const driversRouter = require("./drivers/drivers.routes");
const cardsRouter = require("./paymentCards/paymentCards.routes");
const runsRouter = require("./runs/runs.routes");

const router = new Router();

router.use("/cars", carsRouter);
router.use("/runs", runsRouter);
router.use("/drivers", driversRouter);
router.use("/cards", cardsRouter);

module.exports = router;
