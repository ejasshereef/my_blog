import mongoose, { Document, Schema, model } from "mongoose";
import { tsUser } from "../utils/types";

/**
 * Defining the structure of user document in mongoDB
 */
const userSchema = new Schema<tsUser>(
  {
    user_id: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

/**
 * Id generating function which will check for current document
 * if current if present then id will be incremented otherwise 1
 *  */

const generateId = async () => {
  try {
    const latestDoc: tsUser | null = await User.findOne().sort({ user_id: -1 });
    const latestId: number = latestDoc ? latestDoc?.user_id : 0;
    return latestId + 1;
  } catch (err) {
    console.error("Error generating Id", err);
  }
};

/**
 *  Pre-save hook to set the user_id field
 */
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.user_id = (await generateId()) as number;
  }
  next();
});

/**
 * Mongoose model for the User schema.
 * This will be used to interact with the User collection in MongoDB.
 */
const User = model("User", userSchema);

export default User;
