import express from "express";
import userRouter from "./src/features/user/user.routers.js";
import bodyParser from "body-parser"; // Import body-parser
import postRouter from "./src/features/post/post.routers.js";
import session from "express-session";

const port = 3002;
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.json());

app.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to social media APIs");
});

app.use((req, res, next) => {
  res.locals.userid = req.session.userid;
  res.locals.userEmail = req.session.userEmail;
  next();
});
// Use the user router
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
