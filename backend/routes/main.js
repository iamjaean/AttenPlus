const { Router } = require("express");
const { processDates } = require("../public/js/processDates");
const { Challenge, User } = require("../models");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const challenges = await Challenge.find({})
      .sort({ createdAt: -1 })
      .populate("author")
      .populate("joinusers");

    let user = "";
    if (req.cookies.token) {
      user = await User.findOne({
        shortId: req.user.shortId,
      });
    }
    res.render("main", {
      challenges: challenges,
      user: user,
      processDates: processDates,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/board", async (req, res, next) => {
  const category = ["운동", "생활", "정서", "역량", "취미"];
  try {
    const param = req.query.category;
    if (category.includes(param)) {
      const challenges = await Challenge.find({
        category: param,
      })
        .sort({ createdAt: -1 })
        .populate("author")
        .populate("joinusers");
      let user = "";
      if (req.cookies.token) {
        user = await User.findOne({
          shortId: req.user.shortId,
        });
      }
      res.render("category", {
        title: param,
        challenges: challenges,
        user: user,
        processDates: processDates,
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
