var posts = [];

export default class postModel {
  constructor(id, userid, caption, imageUrl) {
    this.id = id;
    this.userid = userid;
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
}

posts = [
  {
    id: 1,
    userid: "1",
    caption: "this is my first post",
    imageUrl: "adarsh.jpg",
  },
];
