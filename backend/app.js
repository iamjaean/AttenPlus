const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const userPageRouter = require("./routes/userpage");
const authRouter = require("./routes/auth");
const path = require("path");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const getUserFromJWT = require("./middlewares/get-user-from-jwt");
require("./passport")();
// DB 연결
mongoose.connect("mongodb://localhost:27017/simple-board");
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cookieParser());
app.use(getUserFromJWT);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.send("Hello World!!!!");
});

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/userpage", userPageRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
