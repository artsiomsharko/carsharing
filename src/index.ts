import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router";

console.clear();

dotenv.config();

const app = express();

app.use(express.json());
app.use("/", router);

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

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

function foo(a) {
  return a * 3;
}

console.log(foo(4));

start();
