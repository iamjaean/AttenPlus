const { Router, response } = require("express");
const asyncHandler = require("../utils/async-handler");
const { Challenge ,User } = require("../models");
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
    res.redirect(`/user/${shortId}/create`);
  })
);

router.get(
  "/:shortId/create",
  asyncHandler(async (req, res) => {
    console.log(req.user);
    const { shortId } = req.params;
    const author = await User.findOne({
      shortId: req.user.shortId,
    });
    const challenges = Challenge.find({ author: author}).sort({updatedAt: -1}).populate('author');
    challenges.find({}, (err, challenges) => {
      if (err) {
        console.log(err);
        res.status(500).send('An error occurred', err);
      }
      else {
          res.render('userPage_test', { challenges: challenges });
      }
    });
    
  })
);

router.get(
  "/:shortId/join",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const user = await User.findOne({
      shortId: req.user.shortId,
    });
    const challenges = Challenge.find({ joinusers: user}).sort({updatedAt: -1}).populate('joinusers');
    challenges.find({}, (err, challenges) => {
      if (err) {
        console.log(err);
        res.status(500).send('An error occurred', err);
      }
      else {
          res.render('userPage_test', { challenges: challenges });
      }
    });
  })
);

// router.get(
//   "/:shortId",
//   asyncHandler(async (req, res) => {
//     console.log(req.user);
//     const { shortId } = req.params;
//     const author = await User.findOne({
//       shortId: req.user.shortId,
//     });
//     const createchallenges = Challenge.find({ author: author}).sort({createdAt: -1}).populate('author');
//     const joinchallenges = Challenge.find({ joinusers: author}).sort({createdAt: -1}).populate('joinusers');
//     // res.render('userPage_test', { createchallenges: createchallenges, joinchallenges:joinchallenges });
//     res.render('userPage_test', { createchallenges: createchallenges });
//   })
// );


module.exports = router;
