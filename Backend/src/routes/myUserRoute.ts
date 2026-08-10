import express from "express";
import myUserController from "../controllers/myUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validareMyUserRequest } from "../middleware/validation";

const router = express.Router();

// CREATE
router.post("/", jwtCheck, myUserController.createCurrentUser);

// GET
router.get("/", jwtCheck, jwtParse, myUserController.getCurrentUser);

// UPDATE
router.put(
  "/",
  jwtCheck,
  jwtParse,
  validareMyUserRequest,
  myUserController.updateCurrentUser,
);

export default router;
