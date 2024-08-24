/**
 * Interface to define the structure of a User document.
 * It extends the Mongoose Document interface.
 */

import { ObjectId } from "mongoose";

export interface tsUser extends Document {
  _id: ObjectId;
  user_id: number;
  name: string;
  email: string;
  phone: number;
  password: string;
}

export interface tsPost extends Document {
  _id: ObjectId;
  post_id: number;
  user_id: number;
  user_name: string;
  post_title: string;
  post_description: string;
}
