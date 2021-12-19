const { Router } = require("express");
const { Post } = require("../models");

const router = Router();

router.get("/", async (req, res, next) => {
  const posts = await Post.find({});
  res.json(posts);
});

module.exports = router;
