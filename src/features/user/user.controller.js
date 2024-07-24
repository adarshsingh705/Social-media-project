import userModel from "./user.model.js";

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

      const { email, password } = req.body;

      // Log extracted values to debug
      console.log("Email:", email, "Password:", password);

      const user = await userModel.validUser(email, password);

      // Log the returned user object to debug
      console.log("User:", user);

      if (user) {
        res.status(200).send({
          message: "User signed in successfully",
          user: { name: user.name },
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
