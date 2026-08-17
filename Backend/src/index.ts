import "dotenv/config";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

import myUserRoute from "./routes/myUserRoute";
import MyRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurentRoutes"
import orderRoute from "./routes/OrderRoutes"
// CHECK ENV VARIABLES

console.log("Cloudinary config check:", {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  hasSecret: !!process.env.CLOUDINARY_API_SECRET,
});
console.log("secret length:", process.env.CLOUDINARY_API_SECRET?.length);
// CLOUDINARY CONFIG

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MONGODB

mongoose
  .connect(process.env.MONGOBD_CONNECTION as string)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// EXPRESS

const app = express();

app.use(cors());

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());

// ROUTES

app.use("/api/my/user", myUserRoute);

app.use("/api/my/restaurant", MyRestaurantRoute);

app.use("/api/restaurant",restaurantRoute)

app.use("/api/order",orderRoute)
// SERVER

app.listen(7000, () => {
  console.log("server started on localhost:7000");
});
