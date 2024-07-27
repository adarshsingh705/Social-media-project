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

      // Extract email and password from the request body
      const { email, password } = req.body;

      // Log extracted values to debug
      console.log("Email:", email, "Password:", password);

      // Validate user credentials
      const user = await userModel.validUser(email, password);

      if (user) {
        const { id: userid, email: usermail, name } = user;

        // Retrieve posts by the user
        let userpost = await postModel.getallpost();

        // Log the returned user object and posts for debugging
        console.log("User:", user);
        console.log("User posts:", userpost);

        // Set session variables
        req.session.userEmail = usermail;
        req.session.userid = userid;

        // Log session details for debugging
        console.log("Session ID:", req.session.id);
        console.log("Session User Email:", req.session.userEmail);
        console.log("Session User ID:", req.session.userid);

        // Send response
        res.status(200).send({
          message: "User signed in successfully",
          user: { name },
          userpost,
        });
      } else {
        res.status(400).send({ error: "Invalid email or password" });
      }
    } catch (error) {
      // Log the error to debug
      console.error("Error signing in:", error.message);
      res.status(400).send({ error: error.message });
    }
  }
}

//  i am working on when update is heppen it most store user id
