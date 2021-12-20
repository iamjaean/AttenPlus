const { Router, response } = require("express");
const asyncHandler = require("../utils/async-handler");
const { User } = require("../models");
const hashPassword = require("../utils/hash-password");
const ejs = require("ejs");
const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    if (!req.user) {
      res.redirect("../sign");
      return;
    }
    const shortId = req.user.shortId;
    res.redirect(`/userpage/${shortId}`);
  })
);

router.get(
  "/:shortId",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const author = await User.findOne({ shortId });
    const user = req.user;

    res.render("../views/userpage", { author, user });
  })
);

router.post(
  "/:shortId",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const { name, intro } = req.body;

    console.log(name);
    console.log(intro);
    await User.findOneAndUpdate({ shortId }, { name: name });
    const author = await User.find({ shortId });

    res.redirect(`/userpage/${shortId}`);
  })
);

module.exports = router;
