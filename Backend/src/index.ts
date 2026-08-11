import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import myUserRoute from "./routes/myUserRoute";
import MyRestaurantRoute from './routes/MyRestaurantRoute'
dotenv.config();

mongoose
  .connect(process.env.MONGOBD_CONNECTION as string)
  .then(() => console.log("Connected to MongoDB!"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());

//api/my/user
app.use("/api/my/user", myUserRoute);

app.use("/api/my/restaurant", MyRestaurantRoute)

app.listen(7000, () => {
  console.log("server started on localhost:7000");
});
