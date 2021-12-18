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
  "/join",
  asyncHandler(async (req, res, next) => {
    const { email, userName, password } = req.body;
    const hashedPassword = hashPassword(password);

    //이메일 중복체크
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.send("이미 존재하는 이메일 입니다.");
    }

    //모델생성
    const user = new User({
      email,
      name: userName,
      password: hashedPassword,
    });

    //DB 접근
    user.save((err) => {
      if (err) {
        return res.send("일시적인 오류가 발생했습니다.");
      } else {
        return res.status(200).send(user);
      }
    });
  })
);

router.get("/logout", (req, res, next) => {
  res.cookie("token", null, { maxAge: 0 });
  res.redirect("/");
});

router.get("/reset-password", (req, res, next) => {
  res.send("reset-password 페이지입니다.");
});

module.exports = router;
