import postController from "./post.controller.js";

import express from "express";

const postRouter = express.Router();

const PostController = new postController();

postRouter.post("/", PostController.newPost);

postRouter.get("/:id", PostController.getPostId);

postRouter.get("/delete/:id", PostController.getDeletePost);

postRouter.post("/update/:id", PostController.updatepost);

export default postRouter;
