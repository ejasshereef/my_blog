import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import EnvKeys from "../utils/EnvKeys";
import { ApiError } from "../utils/ApiError";
import { tsUser } from "../utils/types";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body as {
      name?: string;
      email?: string;
      phone?: number;
    };

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({
        message: "user already registered",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      const user = await User.create({
        name,
        email,
        phone,
        password,
      });

      if (user) {
        const token = jwt.sign({ id: user._id }, EnvKeys.JWT_SECRET_KEY, {
          expiresIn: 60 * 60,
        });

        res.cookie("jwt", token, {
          httpOnly: false,
          sameSite: "strict",
          maxAge: 3600000,
        });

        res.status(200).json({
          user,
          message: "Signup Succesful",
        });
      } else {
        res.status(400);
        throw new ApiError(400, "Invalid user data");
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: any;
    };

    const user: tsUser | null = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Email no found" });
    } else {
      const isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        if (!EnvKeys?.JWT_SECRET_KEY) {
          throw new ApiError(500, "Missing JWT secret key");
        }
        const token = jwt.sign({ id: user?._id }, EnvKeys?.JWT_SECRET_KEY, {
          expiresIn: 60 * 60,
        });
        if (token) {
          res.cookie("jwt", token, {
            httpOnly: false,
            sameSite: "strict",
            maxAge: 3600000,
          });
        }

        res.status(200).json({ user, message: "Login success" });
      } else {
        res.status(400);
        throw new ApiError(400, "Invalid user data");
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.error("Error finding user:", error);
    throw new ApiError(500, "Internal server error");
  }
};
