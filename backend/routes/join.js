const { Router } = require("express");
const asyncHandler = require("../utils/async-handler");
const { User } = require("../models");
const hashPassword = require("../utils/hash-password");
const router = Router();

router.get("/", (req, res) => {
  res.send("hello");
});

//회원가입
router.post(
  "/register",
  asyncHandler(async (req, res, next) => {
    const { email, userName, password } = req.body;
    const hashedPassword = hashPassword(password);
    const user = await User.create({
      email,
      name: userName,
      password: hashedPassword,
    });
    console.log("신규 유저" + user);

    res.send(user);
  })
);

module.exports = router;
