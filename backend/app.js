const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const userRouter = require("./routes/join");
const userPageRouter = require("./routes/userpage");
const path = require("path");
// DB 연결
mongoose.connect("mongodb://localhost:27017/simple-board");
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../frontend/src")));
app.use(express.static(path.join(__dirname, "../frontend/public")));

app.get("/", (req, res) => {
  res.send("Hello World!!!!");
});

app.use("/join", userRouter);
app.use("/userpage", userPageRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
