/**
 * @swagger
 * components:
 *   schemas:
 *     NewRun:
 *       type: object
 *       required:
 *         - driverId
 *         - carId
 *         - startDate
 *       properties:
 *         driverId:
 *           type: string
 *           description: The ID of the driver associated with the run
 *         carId:
 *           type: string
 *           description: The ID of the car associated with the run
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The start date of the run
 *         finishFuelLevel:
 *           type: number
 *           description: The fuel level of the car at the end of the run (if available)
 *         finishMileage:
 *           type: number
 *           description: The mileage of the car at the end of the run (if available)
 *       example:
 *         driverId: 610f07d8748e9a5e2832b4c2
 *         carId: 610f07d8748e9a5e2832b4c3
 *         startDate: "2023-07-31T12:00:00Z"
 *         finishFuelLevel: 50
 *         finishMileage: 5000
 *     Run:
 *       allOf:
 *         - properties:
 *             _id:
 *               type: string
 *               description: The unique mongo id of the run
 *         - $ref: '#/components/schemas/NewRun'
 *         - example:
 *             _id: 649ae65e4681bbd0910bfc62
 *             driverId: 610f07d8748e9a5e2832b4c2
 *             carId: 610f07d8748e9a5e2832b4c3
 *             startDate: "2023-07-31T12:00:00Z"
 *             finishFuelLevel: 50
 *             finishMileage: 5000
 */

import mongoose, { Schema, Types } from "mongoose";

export interface Run {
  driverId: Types.ObjectId;
  carId: Types.ObjectId;
  startDate: Date;
  finishFuelLevel?: number;
  finishMileage?: number;
}

const RunsSchema = new Schema<Run>({
  driverId: {
    type: Schema.Types.ObjectId,
    ref: "Drivers",
    required: true,
  },
  carId: {
    type: Schema.Types.ObjectId,
    ref: "Cars",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  finishFuelLevel: {
    type: Number,
    default: null,
    required: false,
  },
  finishMileage: {
    type: Number,
    default: null,
    required: false,
  },
});

export default mongoose.model<Run>("Runs", RunsSchema);
