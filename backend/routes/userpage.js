const { Router, response } = require("express");
const asyncHandler = require("../utils/async-handler");
const { User } = require("../models");
const hashPassword = require("../utils/hash-password");
const router = Router();

router.get(
  "/:shortId",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const user = await User.findOne({ shortId });

    res.render("../views/userpage", user);
  })
);

module.exports = router;
