import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const mongoUri = process.env.MONGO_URI;
const mongoDbName = process.env.MONGO_DB_NAME;

export function connectDb() {
  return mongoose.connect(mongoUri, {
    dbName: mongoDbName,
    retryWrites: true,
  });
}
