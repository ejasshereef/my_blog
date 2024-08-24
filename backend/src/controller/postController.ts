import { Response, Request } from "express";
import Post from "../models/postModel";
import { ApiError } from "../utils/ApiError";
import { tsPost } from "../utils/types";

export const getPost = async (req: Request, res: Response) => {
  try {
    const savedPost = await Post.find();
    if (Array.isArray(savedPost) && savedPost?.length > 0) {
      res.status(200).json({
        message: "fetched saved posts successfully...!",
        data: savedPost,
      });
    } else {
      res.status(400).json({
        message: "No saved Post to fetch...!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.error(error);
  }
};

export const getPostDetail = async (req: Request, res: Response) => {
  try {
    const post_id: number = parseInt(req.params.id);
    const savedPost: tsPost | null = await Post.findOne({ post_id });

    if (typeof savedPost === "object") {
      res.status(200).json({
        message: "fetched saved posts successfully...!",
        data: savedPost,
      });
    } else {
      res.status(400).json({
        message: "No saved Post to fetch...!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.error(error);
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { post_title, post_description } = req.body as {
      post_title: string;
      post_description: string;
    };

    const user = req.user;
    if (!user?.user_id && !user?.name) {
      res.status(400).json({
        message: "No user found",
      });
    } else if (user?.user_id && user?.name && post_title && post_description) {
      const savedPost = await Post.create({
        user_id: user?.user_id,
        user_name: user?.name,
        post_title,
        post_description,
      });

      if (savedPost) {
        res.status(200).json({
          message: "Post created successfully...!",
        });
      }
    } else {
      res.status(400);
      throw new ApiError(400, "Invalid user data");
    }
  } catch (error) {
    console.error(error);
  }
};

export const editPost = async (req: Request, res: Response) => {
  try {
    const { post_title, post_description } = req.body;
    const post_id: number = parseInt(req.params.id);
    const user = req.user;

    const savedPost = await Post.findOne({ post_id });

    if (savedPost?.user_id === user?.user_id) {
      await Post.updateOne(
        { post_id },
        { $set: { post_title, post_description } }
      ).then(() => {
        res.status(200).json({
          message: "Post Updated successfully...!",
        });
      });
    } else {
      res.status(400).json({
        message:
          "Unauthorized: You are not allowed to edit this post as it belongs to another user.",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post_id: number = parseInt(req.params.id);
    const user = req.user;
    const savedPost = await Post.findOne({ post_id });
    if (savedPost?.user_id === user?.user_id) {
      await Post.deleteOne({ post_id }).then(() => {
        res.status(200).json({
          message: "Post deleted Successfully...!",
        });
      });
    } else {
      res.status(400).json({
        message:
          "Unauthorized: You are not allowed to delete this post as it belongs to another user.",
      });
    }
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Unexpected error");
  }
};
