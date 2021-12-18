const { Router, response } = require("express");
const asyncHandler = require("../utils/async-handler");
const { User } = require("../models/schemas/user");
const hashPassword = require("../utils/hash-password");
const router = Router();

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = {
      userId: id,
      name: `User#${id}`,
    };

    res.render("../views/userpage", user);
  })
);

module.exports = router;
