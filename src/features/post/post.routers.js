import postController from "./post.controller.js";

import express from "express";

const postRouter = express.Router();

const PostController = new postController();

postRouter.post("/", PostController.newPost);

postRouter.get("/:id", PostController.getPostId);

postRouter.get("/delete/:id", PostController.getDeletePost);

postRouter.post("/update/:id", PostController.updatepost);

postRouter.get("/like/:id", PostController.getLike);

postRouter.get("/total-like/:id", PostController.getAllLikes);

postRouter.post("/comment/:id", PostController.addComment);

postRouter.post("/comment/update/:id", PostController.updateComment);


postRouter.get("/comment/delete/:postId/:commentId", PostController.deletComment);




export default postRouter;
