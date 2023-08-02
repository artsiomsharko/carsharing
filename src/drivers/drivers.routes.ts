import { Router } from "express";
import driversController from "./drivers.controller";
import validateObjectId from "../middlewares/objectId";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Drivers
 */

/**
 * @swagger
 * /drivers:
 *   get:
 *     summary: Returns drivers
 *     tags: [Drivers]
 *     responses:
 *       200:
 *         description: All drivers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Driver'
 *       500:
 *         description: Some server error
 */
router.get("/", driversController.getAll);

/**
 * @swagger
 * /drivers/{id}:
 *   get:
 *     summary: Returns driver by id
 *     description: Returns driver by id
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The driver id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Driver'
 *       500:
 *         description: Some server error
 */
router.get("/:id", validateObjectId, driversController.getOne);

/**
 * @swagger
 * /drivers:
 *   post:
 *     summary: Create driver
 *     description: Create driver
 *     tags: [Drivers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewDriver'
 *     responses:
 *       200:
 *         description: Created driver
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Driver'
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
router.post("/", driversController.create);

/**
 * @swagger
 * /drivers/{id}:
 *   put:
 *     summary: Update driver by id
 *     description: Update driver by id
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The driver id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewDriver'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Driver'
 *       500:
 *         description: Some server error
 */
router.put("/:id", validateObjectId, driversController.update);

/**
 * @swagger
 * /drivers/{id}:
 *   delete:
 *     summary: Delete driver by id with his payment cards
 *     description: Delete driver by id with his payment cards
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The driver id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Driver'
 *       500:
 *         description: Some server error
 */
router.delete("/:id", validateObjectId, driversController.delete);

export default router;
