const { Router } = require("express");
const { Challenge } = require("../models");

const router = Router();

router.get("/", async (req, res, next) => {
  const challenges = Challenge.find({})
    .sort({ createdAt: -1 })
    .populate("author")
    .populate("joinusers");
  challenges.find({}, (err, challenges) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.render("main", { challenges: challenges });
    }
  });
});

module.exports = router;
