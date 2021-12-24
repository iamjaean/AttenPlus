const { Router } = require("express");
const { Challenge, User } = require("../models");

const router = Router();

router.get("/", async (req, res, next) => {
  const challenges = Challenge.find({})
    .sort({ createdAt: -1 })
    .populate("author")
    .populate("joinusers");

  let user = "";
  if (req.cookies.token) {
    user = await User.findOne({
      shortId: req.user.shortId,
    });
  }
  challenges.find({}, (err, challenges) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.render("main", { challenges: challenges, user: user });
    }
  });
});

module.exports = router;
