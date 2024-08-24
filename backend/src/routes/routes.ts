import express, { Request, Response } from "express";
import { loginUser, registerUser } from "../controller/userController";
import { createPost, deletePost, editPost, getPost, getPostDetail } from "../controller/postController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/register",
  async (req: Request, res: Response) => await registerUser(req, res)
);

router.post(
  "/login",
  async (req: Request, res: Response) => await loginUser(req, res)
);

router.post(
  "/create-post",
  protect,
  async (req: Request, res: Response) => await createPost(req, res)
);

router.get(
  "/posts",
  protect,
  async (req: Request, res: Response) => await getPost(req, res)
);

router.get(
  "/posts/:id",
  protect,
  async (req: Request, res: Response) => await getPostDetail(req, res)
);

router.put(
  "/posts/:id",
  protect,
  async (req: Request, res: Response) => await editPost(req, res)
);

router.delete(
  "/posts/:id",
  protect,
  async (req: Request, res: Response) => await deletePost(req, res)
);

export default router;
