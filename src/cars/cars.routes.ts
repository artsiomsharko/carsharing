import { Router } from "express";
import carsController from "./cars.controller";
import validateObjectId from "../middlewares/objectId";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Cars
 *     description: The cars managing API
 */

/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Returns cars
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: All cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       500:
 *         description: Some server error
 */
router.get("/", carsController.getAll);

/**
 * @swagger
 * /cars/low-fuel:
 *   get:
 *     summary: Return list of cars that are currently in use and fuel level less than 1/4 of full tank
 *     description: Return list of cars that are currently in use and fuel level less than 1/4 of full tank
 *     tags: [Cars]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       500:
 *         description: Some server error
 */
router.get("/low-fuel", carsController.getLowFuelInUse);

/**
 * @swagger
 * /cars/reserved-unauthorized:
 *   get:
 *     summary: all cars that has been reserved, but driver credit/debit card hasn't been authorized. Return VIN, location, driver first/last name and driver license number
 *     description: all cars that has been reserved, but driver credit/debit card hasn't been authorized. Return VIN, location, driver first/last name and driver license number
 *     tags: [Cars]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       500:
 *         description: Some server error
 */
router.get("/reserved-unauthorized", carsController.getReservedUnauthorized);

/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Returns car by id
 *     description: Returns car by id
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The car id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       500:
 *         description: Some server error
 */
router.get("/:id", validateObjectId, carsController.getOne);

/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Create car
 *     description: Create car
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCar'
 *     responses:
 *       200:
 *         description: Created car
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Some server error
 */
router.post("/", carsController.create);

/**
 * @swagger
 * /cars/old-in-service:
 *   put:
 *     summary: Update any car produced before '01/01/2017' or has mileage greater than 100000 km by setting Status to In Service
 *     description: Update any car produced before '01/01/2017' or has mileage greater than 100000 km by setting Status to In Service
 *     tags: [Cars]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MongoUpdateResult'
 *       500:
 *         description: Some server error
 */
router.put("/old-in-service", carsController.moveOldInService);

/**
 * @swagger
 * /cars/relocate-free:
 *   put:
 *     summary: Update any car that has been booked more than 2 times and aren't *In use* or *Reserved* by setting location coordinates to latitude=53.8882836, longitude=27.5442615
 *     description: Update any car that has been booked more than 2 times and aren't *In use* or *Reserved* by setting location coordinates to latitude=53.8882836, longitude=27.5442615
 *     tags: [Cars]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MongoUpdateResult'
 *       500:
 *         description: Some server error
 */
router.put("/relocate-free", carsController.changeLocationForFree);

/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     summary: Update car by id
 *     description: Update car by id
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The car id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCar'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       500:
 *         description: Some server error
 */
router.put("/:id", validateObjectId, carsController.update);

/**
 * @swagger
 * /cars/{vin}:
 *   delete:
 *     summary: Delete car by VIN number
 *     description: Delete car by VIN number
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: vin
 *         schema:
 *           type: string
 *         required: true
 *         description: The car vin number
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       500:
 *         description: Some server error
 */
router.delete("/:vin", carsController.deleteByVin);

export default router;
