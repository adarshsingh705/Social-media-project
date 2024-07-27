import userModel from "../user/user.model.js";
class Comment {
  constructor(id, userId, text) {
    this.id = id;
    this.userId = userId;
    this.text = text;
  }
}

let posts = [];

export default class postModel {
  constructor(id, userId, caption, imageUrl) {
    this.id = id;
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
    this.likes = [];
    this.comments = [];
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
  static updatePost(caption, imageUrl, id, userid) {
    // number(id);
    console.log(typeof id, typeof userId);
    console.log(typeof posts[0].id, typeof posts[0].userId);

    // Find the index of the post to be updated
    const postIndex = posts.findIndex((p) => p.id == id && p.userid == userid);

    console.log(`user id from post model ${postIndex}`);

    if (postIndex === -1) {
      // If the post is not found, return null
      return null;
    }

    // Create a new post object with updated data
    const updatedPost = new postModel(id, userid, caption, imageUrl);

    // Replace the old post with the updated post
    posts[postIndex] = updatedPost;

    // Log the updated post for debugging
    console.log(
      `this is update post data received from postman ${updatedPost}`
    );

    // Return the updated post object
    return updatedPost;
  }

  static getallpost() {
    return posts;
  }

  static likePost(userid, id) {
    const post = postModel.getPostById(id);

    if (!post) {
      return null; // Post not found
    }

    // Ensure `likes` is an array
    if (!Array.isArray(post.likes)) {
      post.likes = [];
    }

    // Check if user has already liked the post
    if (post.likes.includes(userid)) {
      return `User ${userid} has already liked this post.`;
    }

    // Add the userId to the likes array
    post.likes.push(userid);

    // Return the number of likes and the list of user IDs who liked the post
    return {
      totalLikes: post.likes.length,
      usersWhoLiked: post.likes,
    };
  }

  static getAllLikes(id) {
    const postIndex = posts.findIndex((p) => p.id == id);
    if (postIndex === -1) {
      return null;
    }
    const post = posts[postIndex];
    return post.likes.length;
  }

  static addComment(id, userId, text) {
    const post = postModel.getPostById(id);
    console.log(post);
    if (!post) {
      retur;
      null, "post not Found";
    }

    if (!Array.isArray(post.comments)) {
      post.comments = [];
    }

    const newComment = new Comment(post.comments.length + 1, userId, text);
    console.log(newComment);
    post.comments.push(newComment);
    return newComment;
  }

  static updateComment(id, commentId, text) {
    const post = postModel.getPostById(id);
    if (!post) {
      return null, "post not Found";
    }

    const comment = post.comments.find((comment) => comment.id == commentId);

    console.log("this is commmet console from commment model ", comment);

    comment.text = text;

    return comment;
  }

  static deleteComment(postId, commentId, userId) {
    // Find the post by ID
    const post = postModel.getPostById(postId);

    if (!post) {
      return { success: false, message: "Post not found" };
    }

    const commentIndex = post.comments.findIndex(
      (comment) => comment.id === commentId
    );

    // Check if the comment exists
    if (commentIndex === -1) {
      return { success: false, message: "Comment not found" };
    }

    // Check if the user is allowed to delete the comment
    if (
      post.userId === userId ||
      post.comments[commentIndex].userId === userId
    ) {
      post.comments.splice(commentIndex, 1);

      return { success: true, message: "Comment deleted successfully", post };
    } else {
      return {
        success: false,
        message: "You are not allowed to delete this comment",
      };
    }
  }
}

posts = [
  {
    id: 1,
    userid: 1,
    caption: "This is my first post",
    imageUrl: "image1.jpg",
    likes: [1, 2],
    comments: [
      {
        id: 1,
        userId: 2,
        text: "this is my first comment",
      },
    ],
  },
  {
    id: 2,
    userid: 2, // Converted from "2" to 2
    caption: "Exploring the world of coding!",
    imageUrl: "image2.jpg",
  },
  {
    id: 3,
    userid: 3, // Converted from "3" to 3
    caption: "A beautiful sunset view",
    imageUrl: "image3.jpg",
  },
  {
    id: 4,
    userid: 4, // Converted from "4" to 4
    caption: "Delicious homemade pizza",
    imageUrl: "image4.jpg",
  },
  {
    id: 5,
    userid: 5, // Converted from "5" to 5
    caption: "Weekend hiking adventure",
    imageUrl: "image5.jpg",
  },
  {
    id: 6,
    userid: 6, // Converted from "6" to 6
    caption: "Coffee and a good book",
    imageUrl: "image6.jpg",
  },
  {
    id: 7,
    userid: 7, // Converted from "7" to 7
    caption: "Artistic graffiti wall",
    imageUrl: "image7.jpg",
  },
  {
    id: 8,
    userid: 8, // Converted from "8" to 8
    caption: "Sunny day at the beach",
    imageUrl: "image8.jpg",
  },
  {
    id: 9,
    userid: 9, // Converted from "9" to 9
    caption: "Family picnic in the park",
    imageUrl: "image9.jpg",
  },
  {
    id: 10,
    userid: 10,
    caption: "Winter snowfall in the city",
    imageUrl: "image10.jpg",
  },
];
