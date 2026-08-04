import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import myUserRoute from "./routes/myUserRoute";
dotenv.config();

mongoose
  .connect(process.env.MONGOBD_CONNECTION as string)
  .then(() => console.log("Connected to MongoDB!"));

const app = express();
app.use(express.json());
app.use(cors());

//api/my/user
app.use("/api/my/user", myUserRoute);

app.listen(7000, () => {
  console.log("server started on localhost:7000");
});
