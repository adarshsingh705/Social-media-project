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
      console.log(post);
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
      // Extract post ID from URL parameters
      const id = req.params.id;
      // Log the post ID for debugging
      console.log(`Updating post with ID: ${id}`);

      // Extract user ID from session
      const userid = req.session.userid;
      console.log(`this is user id for update data : ${userid}`);
      if (!userid) {
        // If user ID is not found in session, return an error response
        return res.status(401).json({ message: "User not authenticated" });
      }

      // Extract fields from request body
      const { caption, imageUrl } = req.body;
      // Log the fields to be updated for debugging
      console.log(
        `Updating post with caption: ${caption} and imageUrl: ${imageUrl}`
      );

      // Call the updatePost method of postModel
      let result = await postModel.updatePost(caption, imageUrl, id, userid);

      console.log(result);

      // Check the result and respond accordingly
      if (result) {
        return res
          .status(200)
          .json({ message: "Post updated successfully", data: result });
      } else {
        return res
          .status(400)
          .json({ message: "Post not found or not updated", data: result });
      }
    } catch (error) {
      // Log the complete error object for debugging
      console.error("Error updating post:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async getLike(req, res) {
    try {
      const id = req.params.id;
      console.log(id);
      const userid = req.session.userid;

      const LikeData = await postModel.likePost(userid, id);
      console.log(LikeData);
      if (LikeData) {
        return res
          .status(200)
          .json({ message: "Post liked successfully", data: LikeData });
      } else {
        return res
          .status(400)
          .json({ message: "Post not found or not liked", data: LikeData });
      }
    } catch (error) {
      console.error("Error liking post:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async getAllLikes(req, res) {
    try {
      const id = req.params.id;

      const likes = await postModel.getAllLikes(id);
      return res
        .status(200)
        .json({ message: "Likes retrieved successfully", data: likes });
    } catch (error) {
      console.error("Error retrieving likes:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async addComment(req, res) {
    try {
      const id = req.params.id;
      console.log(`this is post if from commet controller:${id}`);
      const comment = req.body.comment;
      const userid = req.session.userid;
      const commentData = await postModel.addComment(id, userid, comment);
      return res
        .status(200)
        .json({ message: "Comment added successfully", data: commentData });
    } catch (error) {
      console.error("Error adding comment:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async updateComment(req, res) {
    try {
      // Extract parameters from the request
      const postId = parseInt(req.params.id, 10);
      const commentId = parseInt(req.body.commentId, 10);
      const text = req.body.text;
      console.log(req.body);

      // Validate inputs
      if (isNaN(postId) || isNaN(commentId)) {
        return res
          .status(400)
          .json({ message: "Invalid post ID or comment ID" });
      }

      if (!text) {
        return res.status(400).json({ message: "Comment text is required" });
      }

      // Call the model method to update the comment
      const commentData = await postModel.updateComment(
        postId,
        commentId,
        text
      );

      if (!commentData) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // Respond with the updated comment data
      return res.status(200).json({
        message: "Comment updated successfully",
        data: commentData,
      });
    } catch (error) {
      // Log the error and respond with a server error status
      console.error("Error updating comment:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async deletComment(req, res) {
    try {
      const postId = parseInt(req.params.postId, 10);
      const commentId = parseInt(req.params.commentId, 10);
      const userid = req.session.userid;

      console.log(commentId, postId);
      // Validate inputs
      if (isNaN(postId) || isNaN(commentId)) {
        return res
          .status(400)
          .json({ message: "Invalid post ID or comment ID" });
      }
      // Call the model method to delete the comment
      const commentData = await postModel.deleteComment(
        postId,
        commentId,
        userid
      );
      console.log(commentData);
      if (!commentData) {
        return res.status(404).json({ message: "Comment not found" });
      }
      // Respond with a success message
      return res.status(200).json({
        message: "Comment deleted successfully",
      });
    } catch (error) {
      // Log the error and respond with a server error status
      console.error("Error deleting comment:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}
