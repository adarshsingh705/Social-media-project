import express from "express";
import userRouter from "./src/features/user/user.routers.js";
import bodyParser from "body-parser"; // Import body-parser
import postRouter from "./src/features/post/post.routers.js";

const port = 3002;
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to social media APIs");
});

// Use the user router
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});