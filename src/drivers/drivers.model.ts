/**
 * @swagger
 * components:
 *   schemas:
 *     NewDriver:
 *       type: object
 *       required:
 *         - licenseNumber
 *         - firstName
 *         - lastName
 *       properties:
 *         licenseNumber:
 *           type: string
 *           description: The license number of the driver
 *         firstName:
 *           type: string
 *           description: The first name of the driver
 *         lastName:
 *           type: string
 *           description: The last name of the driver
 *       example:
 *         licenseNumber: A12345
 *         firstName: John
 *         lastName: Doe
 *     Driver:
 *       allOf:
 *         - properties:
 *             __v:
 *               type: number
 *             _id:
 *               type: string
 *               description: The unique mongo id of the driver
 *         - $ref: '#/components/schemas/NewDriver'
 *         - example:
 *             _id: 649ae65e4681bbd0910bfc62
 *             __v: 0
 *             licenseNumber: A12345
 *             firstName: John
 *             lastName: Doe
 */

import mongoose from "mongoose";

const { Schema } = mongoose;

export interface Driver {
  licenseNumber: string;
  firstName: string;
  lastName: string;
}

const DriversSchema = new Schema<Driver>({
  licenseNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

export default mongoose.model<Driver>("Drivers", DriversSchema);
