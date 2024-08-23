import mongoose from "mongoose";
import EnvKeys from "../utils/EnvKeys";

/**
 * connecting mongoDB
 */
const connectDB = async () => {
  try {
   
    const conn = await mongoose.connect(EnvKeys?.MONGODB_URL);
    console.log(`mongoDB connected: ${conn.connection.host}`);
  } catch (err: any) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
