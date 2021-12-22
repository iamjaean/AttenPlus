const express = require("express");
const app = express();
const port = 80;
const mongoose = require("mongoose");
const mainRouter = require("./routes/main");
const userPageRouter = require("./routes/userpage");
const authRouter = require("./routes/auth");
const signRouter = require("./routes/sign");
const createRouter = require("./routes/create");
const detailRouter = require("./routes/detail");
const path = require("path");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const getUserFromJWT = require("./middlewares/get-user-from-jwt");
require("./passport")();
// DB 연결
mongoose.connect(
  `mongodb+srv://kdt04:${process.env.mongoDB_PASSWORD}@cluster0.2lymz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
);
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

app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/sign", signRouter);
app.use("/user", userPageRouter);
app.use("/create", createRouter);
app.use("/detail", detailRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
