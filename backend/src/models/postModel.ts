import { timeStamp } from "console";
import { Schema, model } from "mongoose";
import { tsPost } from "../utils/types";

/**
 * Defining the structure of post document in mongoDB
 */
const postSchema = new Schema<tsPost>(
  {
    post_id: {
      type: Number,
    },
    user_id: {
      type: Number,
    },
    user_name: {
      type: String,
    },
    post_title: {
      type: String,
    },
    post_description: {
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
    const latestDoc:tsPost| null = await Post.findOne().sort({ post_id: -1 });
    const latestId: number = latestDoc ? latestDoc?.post_id : 100;
    return latestId + 1;
  } catch (err) {
    console.error("Error generating Id", err);
  }
};

/**
 *  Pre-save hook to set the post_id field
 */
postSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.post_id = (await generateId()) as number;
  }
  next();
});

const Post = model("Posts", postSchema);

export default Post;
