const { Router, response } = require("express");
const asyncHandler = require("../utils/async-handler");
const { Challenge, User } = require("../models");
const hashPassword = require("../utils/hash-password");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = Router();

//image upload를 위한 multer 기본 설정

const storage = multer.diskStorage({
  destination: "./public/assets/img/uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

//upload된 파일이 이미지 파일인지 확인.

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: 이미지 파일이 아닙니다.");
  }
}

// user 페이지 접속시 shortId에 따라 맞는 페이지로 라우팅.

router.get(
  "/",
  asyncHandler(async (req, res) => {
    if (!req.user) {
      res.redirect("../sign");
      return;
    }
    const shortId = req.user.shortId;
    res.redirect(`/user/${shortId}`);
  })
);

// 접속 유저에 대한 기본 정보

router.get(
  "/:shortId/userinfo",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const author = await User.findOne({ shortId });
    res.json({
      name: author.name,
      introduce: author.introduce,
    });
  })
);

// user 페이지 기본 라우팅

router.get(
  "/:shortId",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const author = await User.findOne({ shortId });
    const user = await User.findOne({ shortId: req.user.shortId });

    res.render("userpage", { author, user });
  })
);

// 이름 변경

router.post(
  "/:shortId/change-name",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const { name } = req.body;
    await User.findOneAndUpdate({ shortId }, { name: name });

    res.redirect(`/user/${shortId}`);
  })
);

// image 업로드

router.post(
  "/:shortId/upload",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;

    await User.findOneAndUpdate(
      { shortId },
      {
        img: {
          data: fs.readFileSync(
            path.join(
              __dirname,
              "..",
              "/public/assets/img/uploads/",
              req.file.filename
            )
          ),
          contentType: `image/${path.extname(req.file.originalname)}`,
        },
      }
    );
    res.redirect(`/user/${shortId}`);
  })
);

// user 소개 변경

router.post(
  "/:shortId/change-intro",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const { intro } = req.body;
    await User.findOneAndUpdate({ shortId }, { introduce: intro });
    res.redirect(`/user/${shortId}`);
  })
);

// user 비밀번호 변경

router.post(
  "/:shortId/change-password",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const author = await User.findOne({ shortId });

    if (currentPassword) {
      if (hashPassword(currentPassword) !== author.password) {
        res.send(
          "<script>alert('입력하신 비밀번호가 일치하지 않습니다.');history.back();</script>"
        );
        res.redirect(`/user/${shortId}`);
        return;
      } else if (newPassword !== confirmNewPassword) {
        res.send(
          "<script>alert('변경할 비밀번호 확인이 일치하지 않습니다.');history.back();</script>"
        );
        res.redirect(`/user/${shortId}`);
        return;
      }
    }

    await User.findOneAndUpdate(
      { shortId },
      {
        password: hashPassword(newPassword),
      }
    );

    res.send(
      "<script>alert('비밀번호가 변경되었습니다.');history.back();</script>"
    );
    res.redirect(`/user/${shortId}`);
  })
);

// user가 생성한 챌린지들 데이터 제공

router.get(
  "/:shortId/created",
  asyncHandler(async (req, res) => {
    const _page = req.query._page;
    const _limit = req.query._limit;
    const { shortId } = req.params;
    const author = await User.findOne({
      shortId,
    });
    const challenges = Challenge.find({ author: author })
      .sort({ updatedAt: -1 })
      .populate("author", "name")
      .skip((_page - 1) * _limit)
      .limit(_limit);
    challenges.find({}, (err, challenges) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred", err);
      } else {
        const createdChallenges = [];

        challenges.forEach((challenge) => {
          var b64 = Buffer.from(challenge.img.data).toString("base64");

          createdChallenge = {
            name: challenge.author.name,
            title: challenge.title,
            category: challenge.category,
            img: {
              contentType: challenge.img.contentType,
              data: b64,
            },
          };

          createdChallenges.push(createdChallenge);
        });

        res.json(createdChallenges);
      }
    });
  })
);

// 유저가 참여한 챌린지들 데이터 제공

router.get(
  "/:shortId/joined",
  asyncHandler(async (req, res) => {
    const _page = req.query._page;
    const _limit = req.query._limit;
    const { shortId } = req.params;
    const user = await User.findOne({
      shortId,
    });
    const challenges = Challenge.find({ joinusers: { $in: user } })
      .sort({ updatedAt: -1 })
      .populate("user", "name")
      .skip((_page - 1) * _limit)
      .limit(_limit);

    challenges.find({}, (err, challenges) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred", err);
      } else {
        const joinedChallenges = [];

        challenges.forEach((challenge) => {
          var b64 = Buffer.from(challenge.img.data).toString("base64");

          joinedChallenge = {
            name: challenge.author.name,
            title: challenge.title,
            category: challenge.category,
            img: {
              contentType: challenge.img.contentType,
              data: b64,
            },
          };

          joinedChallenges.push(joinedChallenge);
        });

        res.json(joinedChallenges);
      }
    });
  })
);

module.exports = router;
