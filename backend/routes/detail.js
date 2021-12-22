const { Router } = require("express");
const { Challenge } = require("../models");

const router = Router();

router.get("/:shortId", async (req, res, next) => {
  const { shortId } = req.params;
  const challenge = await Challenge.findOne({
    shortId,
  });
  res.render("detailPage", { challenge: challenge });
});

router.post("/:shortId/comments", async (req, res, next) => {
  const { shortId } = req.params;
  const { content } = req.body;
  try {
    await Challenge.updateOne(
      { shortId },
      {
        $push: {
          comments: {
            content,
          },
        },
      }
    );
  } catch (err) {
    next(err);
  }
  res.redirect(`/detail/${shortId}`);
});

router.post("/:shortId/attendance", async (req, res, next) => {
  const { shortId } = req.params;
  const { content } = req.body;
  try {
    await Challenge.updateOne(
      { shortId },
      {
        $push: {
          comments: {
            content,
          },
        },
      }
    );
  } catch (err) {
    next(err);
  }
  res.redirect(`/detail/${shortId}`);
});
module.exports = router;
