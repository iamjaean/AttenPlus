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
  res.render("detailPage", {
    challenge: challenge,
    attendance: attendance,
    user: user,
  });
});

router.post("/:shortId/comments", async (req, res, next) => {
  const { shortId } = req.params;
  const { content } = req.body;
  const author = await User.findOne({
    shortId: req.user.shortId,
  });
  console.log(req.body);
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

// router.post("/:shortId/comments/edit", async (req, res, next) => {
//   const { shortId } = req.params;
//   const { content } = req.body;
//   const author = await User.findOne({
//     shortId: req.user.shortId,
//   });
//   // const challenge = await Challenge.find({}).populate("comments.author");
//   // console.log(challenge[0].comments[0]);
//   try{
//     await Challenge.findOneAndUpdate({
//       shortId: shortId,
//       comments : {$eleMatch: {author: author}},
//     }, {
//         $set: {"comments.$.content": content},
//     }).populate("comments.author");
//   }
//   catch(err){
//     next(err)
//   }
//   res.redirect(`/detail/${shortId}`);
// });

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
