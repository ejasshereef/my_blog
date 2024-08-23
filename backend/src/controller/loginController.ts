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

    console.log("inside register");
    

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new ApiError(400, "User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      name,
      email,
      phone,
      password,
    });

    if (user) {
      const token_user = jwt.sign({ id: user._id }, EnvKeys.JWT_SECRET_KEY, {
        expiresIn: 60 * 60,
      });

      res.status(200).json({
        token_user,
        user,
        message: "Signup Succesful",
      });
    } else {
      res.status(400);
      throw new ApiError(400, "Invalid user data");
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
      res.json({ message: "email not found" });
    } else {
      const isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        const token_user = jwt.sign(
          { id: user?.user_id },
          EnvKeys?.JWT_SECRET_KEY,
          {
            expiresIn: 60 * 60,
          }
        );

        res.status(201).json({ token_user, user, message: "Login success" });
      } else {
        res.status(400);
        throw new ApiError(400, "Invalid user data");
      }
    }
  } catch (error) {
    throw new ApiError(500, "Unexpected error...!");
  }
};
