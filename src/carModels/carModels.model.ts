/**
 * @swagger
 * components:
 *   schemas:
 *     CarModel:
 *       type: object
 *       required:
 *         - brand
 *         - model
 *         - date
 *       properties:
 *         brand:
 *           type: string
 *           description: The brand of the car model
 *         model:
 *           type: string
 *           description: The model of the car
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the car model
 *       example:
 *         brand: Toyota
 *         model: Corolla
 *         date: "2022-07-31"
 */

import mongoose, { Document } from "mongoose";

const { Schema } = mongoose;

export interface CarModel {
  brand: string;
  model: string;
  date: Date;
}

export interface CarModelDoc extends CarModel, Document {}

const CarModelsSchema = new Schema<CarModel>({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model<CarModel>("CarModels", CarModelsSchema);
