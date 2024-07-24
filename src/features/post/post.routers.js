import postController from "./post.controller.js";

import express from "express";

const postRouter = express.Router();

const PostController = new postController();

postRouter.post("/", PostController.newPost);

postRouter.get("/:id", PostController.getPostId);

export default postRouter;
