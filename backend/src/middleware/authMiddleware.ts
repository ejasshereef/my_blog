import jwt from "jsonwebtoken";

import User from "../models/userModel";
import { NextFunction, Request, Response } from "express";
import EnvKeys from "../utils/EnvKeys";
import { tsUser } from "../utils/types";
import { ApiError } from "../utils/ApiError";

declare module "express" {
  interface Request {
    user?: tsUser;
  }
}
/**
 * This middleware checks if a JWT token is present in the request cookies, verifies it,
 * and then attaches the corresponding user document to `req.user`. If the token is missing,
 * invalid, or the user is not found, it responds with a 401 Unauthorized status.
 */
const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // Extracted JWT token
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, EnvKeys?.JWT_SECRET_KEY) as {
        id: string;
      };

      const user = await User.findById(decoded?.id).select("-password");

      if (!user) {
        res.status(400);
        throw new ApiError(400, "Not authorized, user not found");
      }

      req.user = user as tsUser;

      next();
    } catch (error) {
      console.error(error);
      res.status(400);
      throw new ApiError(400, "Not authorized, token failed");
    }
  } else {
    res.status(400);
    throw new ApiError(400, "Not authorized, no token");
  }
};

export { protect };
