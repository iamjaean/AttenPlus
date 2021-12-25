const { Router } = require("express");
const { Challenge, User, JoinChallenge, attendenceCheck } = require("../models/index");
const multer = require("multer");
var fs = require("fs");
var path = require("path");
require("dotenv/config");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./routes/data/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage });

const router = Router();

router.get("/", async (req, res, next) => {
  const user = await User.findOne({
    shortId: req.user.shortId,
  });

  res.render("createPage", { user: user });
});

router.post("/", upload.single("uploaded_file"), async (req, res, next) => {
  const { title, description, category, startdate, enddate } = req.body;

  const author = await User.findOne({
    shortId: req.user.shortId,
  });
  const img = {
    data: fs.readFileSync(path.join(__dirname + "/data/uploads/" + req.file.filename)),
    contentType: "image/png",
  };

  try {
    const post = await Challenge.create({
      img,
      title,
      description,
      category,
      startdate,
      enddate,
      author,
    });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
