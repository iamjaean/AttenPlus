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
    res.redirect(`/user/${shortId}`);
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
    await User.findOneAndUpdate({ shortId }, { name: name, introduce: intro });
    const author = await User.find({ shortId });

    res.redirect(`/user/${shortId}`);
  })
);

router.post(
  "/:shortId/change-password",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const author = await User.findOne({ shortId });

    if (currentPassword) {
      if (hashPassword(currentPassword) !== author.password) {
        console.log("입력하신 비밀번호가 일치하지 않습니다");
        res.redirect(`/user/${shortId}`);
        return;
      } else if (newPassword !== confirmNewPassword) {
        console.log("변경할 비밀번호 확인이 일치하지 않습니다.");
        res.redirect(`/user/${shortId}`);
        return;
      }
    }

    await User.findOneAndUpdate(
      { shortId },
      {
        password: hashPassword(newPassword),
      }
    );

    res.redirect(`/user/${shortId}`);
  })
);

module.exports = router;
