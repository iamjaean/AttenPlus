const { Router } = require("express");
const { Challenge } = require("../models");

const router = Router();

router.get("/", async (req, res, next) => {
  Challenge.find({}, (err, challenges) => {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred', err);
    }
    else {
        res.render('mainPage_test', { challenges: challenges });
    }
  });
});
router.get("/:shortId", async(req, res, next) => {
  const { shortId } = req.params;
  const challenge = await Challenge.findOne({
    shortId,
  });
  res.render('detailPage_test',{challenge:challenge});
});
router.post("/:shortId/comments", async(req, res, next) => {
  const { shortId } = req.params;
  const { content } = req.body;
  const author = "작성자";
  console.log(content);
  try{
    await Challenge.updateOne({shortId}, {
        $push: { comments: {
            content,
            author,
        }},
    });
  }
  catch(err){
    next(err)
  }
  res.redirect("/");
});
module.exports = router;
