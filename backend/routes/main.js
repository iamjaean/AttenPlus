const { Router } = require("express");
const { Challenge, User } = require("../models");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const challenges = await Challenge.find({}).sort({ createdAt: -1 }).populate("author").populate("joinusers");

    let user = "";
    if (req.cookies.token) {
      user = await User.findOne({
        shortId: req.user.shortId,
      });
    }
    res.render("main", { challenges: challenges, user: user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
