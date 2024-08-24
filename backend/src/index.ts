import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db";
import EnvKeys from "./utils/EnvKeys";
import router from "./routes/routes";
import { errorHandler } from "./middleware/errorMiddleware";
import cookieParser from "cookie-parser";

const app = express();

connectDB();

const PORT = EnvKeys?.PORT || 2000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
