/**
 * @swagger
 * components:
 *   schemas:
 *     Point:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [Point]
 *         coordinates:
 *           type: array
 *           items:
 *             type: number
 *       description: The current location of the car
 *       example:
 *         type: Point
 *         coordinates: [123.456, 78.910]
 *     NewCar:
 *       type: object
 *       required:
 *         - vin
 *         - registrationNumber
 *         - status
 *         - fuelLevel
 *         - mileage
 *         - productionInfoId
 *         - location
 *       properties:
 *         vin:
 *           type: string
 *           description: VIN number of the car
 *         registrationNumber:
 *           type: string
 *           description: Registration number of the car
 *         status:
 *           type: string
 *           enum: [unavailable, in-service, in-use, free, reserved]
 *           description: The current status of the car
 *         fuelLevel:
 *           type: number
 *           description: The current fuel level of the car
 *         mileage:
 *           type: number
 *           description: The total mileage of the car
 *         productionInfoId:
 *           type: string
 *           description: The ID of the production information for the car
 *         currentRunId:
 *           type: string
 *           description: The ID of the current run (if any) for the car
 *         location:
 *           $ref: '#/components/schemas/Point'
 *     Car:
 *       allOf:
 *         - properties:
 *             _id:
 *               type: string
 *               description: The unique mongo id of the car
 *             __v:
 *               type: number
 *         - $ref: '#/components/schemas/NewCar'
 */

import mongoose, { Document, Schema, Types } from "mongoose";

interface Point {
  type: "Point";
  coordinates: number[];
}

export interface Car {
  vin: string;
  registrationNumber: string;
  status: "unavailable" | "in-service" | "in-use" | "free" | "reserved";
  fuelLevel: number;
  mileage: number;
  productionInfoId: Types.ObjectId;
  currentRunId?: Types.ObjectId;
  location: Point;
}

export interface CarDoc extends Document, Car {}

const pointSchema = new Schema<Point>({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    validate: {
      validator(arr: number[]) {
        return Array.isArray(arr) && arr.length === 2;
      },
      message: "location.coordinates should be array of 2 numbers",
    },
    required: true,
  },
});

const CarsSchema = new Schema<Car>({
  vin: {
    type: String,
    unique: true,
    required: true,
  },
  registrationNumber: {
    type: String,
    unique: true,
    required: true,
  },
  status: {
    type: String,
    default: "unavailable",
    enum: ["unavailable", "in-service", "in-use", "free", "reserved"],
    required: false,
  },
  fuelLevel: {
    type: Number,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  productionInfoId: {
    type: Schema.Types.ObjectId,
    ref: "CarModels",
    required: true,
  },
  currentRunId: {
    type: Schema.Types.ObjectId,
    ref: "Runs",
    default: null,
    required: false,
  },
  location: {
    type: pointSchema,
    required: true,
  },
});

export default mongoose.model<Car>("Cars", CarsSchema);
