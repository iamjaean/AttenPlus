const express = require("express");
const app = express();
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
const loginRequired = require("./middlewares/login-required");
const getUserFromJWT = require("./middlewares/get-user-from-jwt");
const getUserData = require("./middlewares/get-user-data");
require("./passport")();
// DB 연결
mongoose.connect(
  `mongodb+srv://kdt04:${process.env.mongoDB_PASSWORD}@cluster0.2lymz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
);
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});
app.set("views", __dirname + "/views");
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
app.use("/user", loginRequired, userPageRouter);
app.use("/create", loginRequired, createRouter);
app.use("/detail", loginRequired, detailRouter);

app.use(function (req, res, next) {
  getUserData(req, res, next).then((user) => {
    res.status(404).render("error", { title: 404, user: user });
  });
});

app.use(function (err, req, res, next) {
  getUserData(req, res, next).then((user) => {
    res.status(502).render("error", { title: 502, user: user });
  });
});

module.exports = app;
