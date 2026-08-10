import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import User from "../models/user";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // jwtCheck has already validated the token
    const auth0Id = req.auth?.payload?.sub;

    if (!auth0Id) {
      return res.status(401).json({
        message: "Invalid token: Auth0 ID not found",
      });
    }

    // Find the MongoDB user using Auth0 ID
    const user = await User.findOne({ auth0Id });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // At this point TypeScript knows user exists
    req.auth0Id = auth0Id;
    req.userId = user._id?.toString() || "";

    next();
  } catch (error) {
    console.error("JWT Parse Error:", error);

    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};