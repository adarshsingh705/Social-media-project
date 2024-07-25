import userModel from "../user/user.model.js";
import postModel from "./post.model.js";

export default class postController {
  async newPost(req, res) {
    try {
      const { caption, imageUrl } = req.body;
      let userId = req.session.userid;
      console.log(userId);
      const newPost = await postModel.addPost(userId, caption, imageUrl);

      if (newPost) {
        return res
          .status(200)
          .json({ message: "Post added successfully", data: newPost });
      } else {
        return res
          .status(400)
          .json({ message: "Post not added", data: newPost });
      }
    } catch (error) {
      // Log the error to debug
      console.error("Error:", error.message);
      res.status(400).send({ error: error.message });
    }
  }

  async getPostId(req, res) {
    try {
      const postId = req.params.id;
      console.log(postId);
      let post = await postModel.getPostById(postId);
      if (post) {
        return res.status(200).json({ message: "Post found", data: post });
      } else {
        return res.status(400).json({ message: "Post not found", data: post });
      }
    } catch (error) {
      // Log the error to debug
      console.error("Error:", error.message);
      res.status(400).send({ error: error.message });
    }
  }

  async getDeletePost(req, res) {
    try {
      let postid = req.params.id;
      let userId = req.session.userid;

      const result = await postModel.DeletePost(postid, userId);

      console.log("this is final result after delete " + result);
      if (result) {
        return res
          .status(200)
          .json({ message: "Post deleted successfully", data: result });
      } else {
        return res
          .status(400)
          .json({ message: "Post not deleted", data: result });
      }
    } catch (error) {
      // Log the error to debug
      console.error("Error:", error.message);
      res.status(400).send({ error: error.message });
    }
  }

  async updatepost(req, res) {
    try {
      let postId = req.params.id;
      console.log(postId);
      let userId = req.session.userId; // Ensure session variable name is consistent
      console.log("this is senson user id " + userId);
      let postObj = req.body;
      console.log(postObj);

      const result = await postModel.updatePost(postObj, postId, userId);

      if (result) {
        return res
          .status(200)
          .json({ message: "Post updated successfully", data: result });
      } else {
        return res
          .status(400)
          .json({ message: "Post not updated", data: result });
      }
    } catch (error) {
      // Log the error to debug
      console.error("Error:", error.message);
      return res.status(400).json({ error: error.message });
    }
  }
}
