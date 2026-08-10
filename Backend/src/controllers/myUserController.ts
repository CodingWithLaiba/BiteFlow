import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id, email } = req.body;

    if (!auth0Id || !email) {
      return res.status(400).json({
        message: "auth0Id and email are required",
      });
    }

    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    const newUser = new User({
      auth0Id,
      email,
    });

    await newUser.save();

    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Create user error:", error);

    return res.status(500).json({
      message: "Error creating user",
    });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Get user error:", error);

    return res.status(500).json({
      message: "Error getting user",
    });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, city, country } = req.body;

    console.log("Update request body:", req.body);
    console.log("User ID:", req.userId);

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error("Update user error:", error);

    return res.status(500).json({
      message: "Error updating user",
    });
  }
};

export default {
  createCurrentUser,
  getCurrentUser,
  updateCurrentUser,
};
