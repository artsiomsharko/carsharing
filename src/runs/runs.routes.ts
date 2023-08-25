import { Router } from "express";
import runsController from "./runs.controller";
import validateObjectId from "../middlewares/objectId";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Runs
 */

/**
 * @swagger
 * /runs/car/{carId}:
 *   get:
 *     summary: Returns all runs for the car
 *     tags: [Runs]
 *     parameters:
 *       - in: path
 *         name: carId
 *         schema:
 *           type: string
 *         required: true
 *         description: The car id
 *     responses:
 *       200:
 *         description: All runs for the car
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Run'
 *       500:
 *         description: Some server error
 */
router.get("/car/:id", validateObjectId, runsController.getAllForCar);

/**
 * @swagger
 * /runs/{id}:
 *   get:
 *     summary: Returns run by id
 *     description: Returns run by id
 *     tags: [Runs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The run id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Run'
 *       500:
 *         description: Some server error
 */
router.get("/:id", validateObjectId, runsController.getOne);

/**
 * @swagger
 * /runs:
 *   post:
 *     summary: Create run
 *     description: Create run
 *     tags: [Runs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               setCurrent:
 *                 type: boolean
 *                 description: If true, set created run as current for car
 *                 required: false
 *             allOf:
 *               - $ref: '#/components/schemas/NewRun'
 *             example:
 *               setCurrent: false
 *               driverId: 610f07d8748e9a5e2832b4c2
 *               carId: 610f07d8748e9a5e2832b4c3
 *               startDate: "2023-07-31T12:00:00Z"
 *               finishFuelLevel: 50
 *               finishMileage: 5000
 *     responses:
 *       200:
 *         description: Created run
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Run'
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
router.post("/", runsController.create);

/**
 * @swagger
 * /runs/{id}:
 *   put:
 *     summary: Update run by id
 *     description: Update run by id
 *     tags: [Runs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The run id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewRun'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Run'
 *       500:
 *         description: Some server error
 */
router.put("/:id", validateObjectId, runsController.update);

/**
 * @swagger
 * /runs/{id}:
 *   delete:
 *     summary: Delete run by id with his runs
 *     description: Delete run by id with his runs
 *     tags: [Runs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The run id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Run'
 *       500:
 *         description: Some server error
 */
router.delete("/:id", validateObjectId, runsController.delete);

export default router;
