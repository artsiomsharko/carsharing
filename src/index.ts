import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router";
import { applySwagger } from "./swagger";
import errorHandler from "./middlewares/error";
import { connectDb } from "./db";

console.clear();

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const port = process.env.PORT || 5000;

const app = express();

applySwagger(app);
app.use(express.json());
app.use("/", router);
app.use(errorHandler);

async function start() {
  mongoose.set("debug", true);

  await connectDb()
    .then((v) => {
      console.log(
        `Connected to MongoDB: ${v.connection.host}/${v.connection.db.namespace}`
      );
    })
    .catch(console.log);

  app.listen(port, () => console.log("Express app started on port:", port));
}

if (process.env.NODE_ENV !== "test") {
  start();
}

export default app;
