const { Router } = require("express");
const asyncHandler = require("../utils/async-handler");
const { User } = require("../models");
const hashPassword = require("../utils/hash-password");
const fs = require("fs");
const path = require("path");
const generateRandomPassword = require("../utils/generate-random-password");
const sendMail = require("../utils/send-mail");
const router = Router();
router.get("/", (req, res) => {
  res.render("sign/login");
});

router.get("/join", (req, res) => {
  res.render("sign/join");
});

router.get("/email", (req, res) => {
  res.render("sign/email");
});

router.get("/pwreset", (req, res) => {
  res.render("sign/pwreset");
});

router.get("/loginFailed", (req, res) => {
  res.send(
    `<script>alert('등록되지 않은 회원 이거나, 비밀번호를 잘못 입력하셨습니다.');location.href='/sign';</script>`
  );
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
      return res.send(
        `<script>alert('이미 존재하는 이메일 입니다.');location.href='/sign';</script>`
      );
    }

    //컬렉션 생성용
    const user = new User({
      img: {
        data: fs.readFileSync(
          path.join(__dirname, "..", "/public/assets/img/img-user-default.png")
        ),
        contentType: "image/png",
      },
      email,
      name: userName,
      password: hashedPassword,
      introduce: "",
    });

    //DB 접근
    user.save((err) => {
      if (err) {
        return res.status(500).send("일시적인 오류가 발생했습니다.");
      } else {
        return res.redirect("/");
      }
    });
  })
);

//비밀번호 재설정
router.post(
  "/pwreset",
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.send(
        `<script>alert('가입되지 않은 이메일 입니다.');location.href='/sign/pwreset';</script>`
      );
    }

    const password = generateRandomPassword();

    await User.updateOne(
      { email },
      {
        password: hashPassword(password),
      }
    );
    await sendMail(
      email,
      "임시 비밀번호가 발급되었습니다.",
      `임시 비밀번호는: ${password} 입니다.`
    );
    res.send(
      `<script>alert('임시 비밀번호가 전송되었습니다.');location.href='/sign';</script>`
    );
  })
);

router.get("/logout", (req, res, next) => {
  res.cookie("token", null, { maxAge: 0 });
  res.redirect("/");
});

module.exports = router;
