import { Router } from "express";
import cardsController from "./paymentCards.controller";
import validateObjectId from "../middlewares/objectId";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: PaymentCards
 */

/**
 * @swagger
 * /cards/driver/{driverId}:
 *   get:
 *     summary: Returns all payment cards for the driver
 *     tags: [PaymentCards]
 *     parameters:
 *       - in: path
 *         name: driverId
 *         schema:
 *           type: string
 *         required: true
 *         description: The driver id
 *     responses:
 *       200:
 *         description: All payment cards for the driver
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PaymentCard'
 *       500:
 *         description: Some server error
 */
router.get("/driver/:id", validateObjectId, cardsController.getAllForDriver);

/**
 * @swagger
 * /cards/driver/{driverId}:
 *   post:
 *     summary: Create payment card for the driver
 *     description: Create payment card for the driver
 *     tags: [PaymentCards]
 *     parameters:
 *       - in: path
 *         name: driverId
 *         schema:
 *           type: string
 *         required: true
 *         description: The driver id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewPaymentCard'
 *     responses:
 *       200:
 *         description: Created payment card for the driver
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentCard'
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
router.post("/driver/:id", validateObjectId, cardsController.create);

/**
 * @swagger
 * /cards/{id}:
 *   get:
 *     summary: Returns payment card by id
 *     description: Returns payment card by id
 *     tags: [PaymentCards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment card id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentCard'
 *       500:
 *         description: Some server error
 */
router.get("/:id", validateObjectId, cardsController.getOne);

/**
 * @swagger
 * /cards/{id}:
 *   put:
 *     summary: Update driver by id
 *     description: Update driver by id
 *     tags: [PaymentCards]
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
 *             $ref: '#/components/schemas/NewPaymentCard'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentCard'
 *       500:
 *         description: Some server error
 */
router.put("/:id", validateObjectId, cardsController.update);

/**
 * @swagger
 * /cards/{id}:
 *   delete:
 *     summary: Delete driver by id with his payment cards
 *     description: Delete driver by id with his payment cards
 *     tags: [PaymentCards]
 *     parameters:
 *       - in: path
 *         name: cardId
 *         schema:
 *           type: string
 *         required: true
 *         description: The driver id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentCard'
 *       500:
 *         description: Some server error
 */
router.delete("/:id", validateObjectId, cardsController.delete);

export default router;
