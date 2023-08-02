/**
 * @swagger
 * components:
 *   schemas:
 *     NewPaymentCard:
 *       type: object
 *       required:
 *         - driverId
 *         - number
 *         - owner
 *         - validThrough
 *       properties:
 *         driverId:
 *           type: string
 *           description: The ID of the driver associated with the payment card
 *         number:
 *           type: integer
 *           description: The card number
 *         owner:
 *           type: string
 *           description: The owner's name as it appears on the card
 *         validThrough:
 *           type: string
 *           format: date
 *           description: The expiration date of the card
 *       example:
 *         driverId: 610fc12a895b480022c6f35a
 *         number: 1234567890123456
 *         owner: John Doe
 *         validThrough: "2001-05-24T21:00:00.000Z"
 *     PaymentCard:
 *       allOf:
 *         - properties:
 *             _id:
 *               type: string
 *               description: The unique mongo id of the payment card
 *         - $ref: '#/components/schemas/NewPaymentCard'
 *         - example:
 *             _id: 649ae65e4681bbd0910bfc62
 *             driverId: 610fc12a895b480022c6f35a
 *             number: 1234567890123456
 *             owner: John Doe
 *             validThrough: "2001-05-24T21:00:00.000Z"
 */

import mongoose, { Types, Schema } from "mongoose";

export interface PaymentCard {
  driverId: Types.ObjectId;
  number: number;
  owner: string;
  validThrough: Date;
}

const PaymentsCardsSchema = new Schema<PaymentCard>({
  driverId: { type: Schema.Types.ObjectId, ref: "Drivers", required: true },
  number: { type: Number, required: true },
  owner: { type: String, required: true },
  validThrough: { type: Date, required: true },
});

export default mongoose.model<PaymentCard>(
  "PaymentsCards",
  PaymentsCardsSchema
);
