const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const userRouter = require("./routes/join");
// DB 연결
mongoose.connect("mongodb://localhost:27017/simple-board");
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!!!!");
});

app.use("/join", userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
