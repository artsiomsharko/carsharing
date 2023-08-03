import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router";
import { applySwagger } from "./swagger";
import errorHandler from "./middlewares/error";

console.clear();

dotenv.config();

const port = (process.env.PORT as unknown as number) || 5000;
const mongoUri = process.env.MONGO_URI;

const app = express();

applySwagger(app, port);
app.use(express.json());
app.use("/", router);
app.use(errorHandler);

async function start() {
  mongoose.set("debug", true);

  await mongoose
    .connect(mongoUri, {})
    .then((v) => {
      console.log("Connected to MongoDB:", v.connection.host);
    })
    .catch(console.log);

  app.listen(port, () => console.log("Express app started on port:", port));
}

start();
