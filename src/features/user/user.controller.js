import userModel from "./user.model.js";
import postModel from "../post/post.model.js";
import session from "express-session";

export default class UserController {
  // sign up

  async signUp(req, res) {
    try {
      console.log(req.body);
      const { name, email, password } = req.body;
      userModel.addUser(name, email, password);
      res.status(201).send({
        message: "User signed up successfully",
        user: { name, email },
      });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  //   sign IN

  async signIn(req, res) {
    try {
      // Log the request body to debug
      console.log("Request body:", req.body);

      let { email, password } = req.body;

      // Log extracted values to debug
      console.log("Email:", email, "Password:", password);

      let user = await userModel.validUser(email, password);

      let userid = user.id;
      let usermail = user.email;

      let userpost = postModel.getPostByUserId(userid);

      console.log(userpost);
      // Log the returned user object to debug
      console.log("User:", user);

      if (user) {
        // Set session variables
        req.session.userEmail = usermail;
        req.session.userid = userid;
        console.log("this console form id" + req.session.id);
        console.log("this console form email" + req.session.email);
        // Send response
        res.status(200).send({
          message: "User signed in successfully",
          user: { name: user.name },
          userpost: { userpost },
        });
      } else {
        res.status(400).send({ error: "Invalid email or password" });
      }
    } catch (error) {
      // Log the error to debug
      console.error("Error:", error.message);
      res.status(400).send({ error: error.message });
    }
  }
}

//  i am working on when update is heppen it most store user id
