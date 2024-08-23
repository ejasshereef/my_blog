import express,{Request,Response} from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import EnvKeys from "./utils/EnvKeys";
import router from "./routes/routes";


const app = express();

connectDB()

const PORT = EnvKeys?.PORT || 2000;

app.use(express.json());
app.use(router)

app.get("/test", (req: Request, res: Response) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
