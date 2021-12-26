const { Router } = require("express");
const { Challenge, User, attendanceCheck } = require("../models");

const router = Router();

router.get("/:shortId", async (req, res, next) => {
  const { shortId } = req.params;
  const challenge = await Challenge.findOne({
    shortId,
  })
    .populate("author")
    .populate("comments.author");
  const user = await User.findOne({
    shortId: req.user.shortId,
  });
  const attendance = await attendanceCheck
    .find({
      $and: [{ user: user }, { challenge: challenge }],
    })
    .populate("user")
    .populate("challenge");
  res.render("detailPage", { challenge: challenge, attendance: attendance, user: user });
});

//댓글 생성
router.post("/:shortId/comments", async (req, res, next) => {
  const { shortId } = req.params;
  const { content } = req.body;
  const author = await User.findOne({
    shortId: req.user.shortId,
  });
  try {
    await Challenge.updateOne(
      { shortId },
      {
        $push: {
          comments: {
            content,
            author,
          },
        },
      }
    );
  } catch (err) {
    next(err);
  }
  res.redirect(`/detail/${shortId}`);
});

//댓글 수정
router.post("/:shortId/comments/edit", async (req, res, next) => {
  const { shortId } = req.params;
  const { comment_index, content } = req.body;
  let challenge = await Challenge.findOne({ shortId });

  try {
    challenge.comments[Number(comment_index)].content = content;
    await challenge.save();
    res.redirect(`/detail/${shortId}`);
  } catch (err) {
    next(err);
  }
});

//댓글 삭제
router.post("/:shortId/comments/delete", async (req, res, next) => {
  const { shortId } = req.params;
  const { comment_index } = req.body;
  let challenge = await Challenge.findOne({ shortId });

  try {
    challenge.comments[Number(comment_index)].isDeleted = true;
    await challenge.save();
    res.redirect(`/detail/${shortId}`);
  } catch (err) {
    next(err);
  }
});

//출석체크
router.post("/:shortId/attendance", async (req, res, next) => {
  const { shortId } = req.params;
  const user = await User.findOne({
    shortId: req.user.shortId,
  });
  const challenge = await Challenge.findOne({ shortId });
  function getTodayDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }
  const attendanceDate = getTodayDate();
  try {
    await attendanceCheck.create({
      user,
      challenge,
      attendanceDate,
    });
    res.redirect(`/detail/${shortId}`);
  } catch (err) {
    next(err);
  }
});

//참석하기
router.post("/:shortId/join", async (req, res, next) => {
  const { shortId } = req.params;
  const user = await User.findOne({
    shortId: req.user.shortId,
  });
  try {
    await Challenge.updateOne(
      { shortId },
      {
        $push: { joinusers: user },
      }
    );
  } catch (err) {
    next(err);
  }

  res.redirect(`/detail/${shortId}`);
});
module.exports = router;
