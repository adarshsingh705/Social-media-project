import postModel from "./post.model.js";

export default class postController {
  async newPost(req, res) {
    try {
      const { userId, caption, imageUrl } = req.body;
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
      const post = await postModel.getPostById(postId);
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
}
