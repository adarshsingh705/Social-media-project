import userModel from "../user/user.model.js";

var posts = [];

export default class postModel {
  constructor(id,userId, caption, imageUrl) {
  
    this.id = id;
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
  }

  static addPost(userid, caption, imageUrl) {
    const newPost = new postModel(posts.length + 1, userid, caption, imageUrl);
    posts.push(newPost);
    console.log(posts);
    return posts;
  }

  static getPostById(id) {
    // Ensure 'posts' is an array and use `find` method
    const result = posts.find((posts) => posts.id == id);
    return result; // Return the found post or `undefined` if not found
  }

  static getPostByUserId(id) {
    const result = posts.filter((posts) => posts.userid == id);
    console.log(result);
    return result;
  }

  static DeletePost(id, userId) {
    const resultIndex = posts.findIndex(
      (p) => p.id == id && p.userid == userId
    );

    const deletedPost = posts.splice(resultIndex, 1)[0]; // splice returns an array, so we take the first (and only) element\

    return deletedPost;
  }

  static updatePost(postobj, postid, userid) {
    // Find the index of the post to update
    const resultIndex = posts.findIndex(
      (p) => p.id == postid && p.userId == userid
    );

    // Check if the post was found
    if (resultIndex !== -1) {
      // Update the post at the found index with postobj
      posts[resultIndex] = postobj;
      return true; // Return true indicating success
    } else {
      return false; // Return false indicating failure (post not found)
    }
  }
}

posts = [
  {
    id: 1,
    userid: "1",
    caption: "this is my first post",
    imageUrl: "adarsh.jpg",
  },
];
