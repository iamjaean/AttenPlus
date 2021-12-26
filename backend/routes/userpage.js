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
  limits: { fileSize: 10000000 },
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

// user 페이지 접속시 shortId에 따라 각 유저에 맞는 페이지로 라우팅.

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

// 접속 유저에 대한 기본 정보 (이름과 소개)

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
    try {
      const author = await User.findOne({ shortId });
      const user = await User.findOne({ shortId: req.user.shortId });

      res.render("userpage", { author, user });
    } catch (err) {
      next(err);
    }
  })
);

// 이름 변경

router.post(
  "/:shortId/change-name",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const { name } = req.body;
    try {
      await User.findOneAndUpdate({ shortId }, { name: name });
      res.redirect(`/user/${shortId}`);
    } catch (err) {
      next(err);
    }
  })
);

// profile image 업로드

router.post(
  "/:shortId/upload",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;

    // image를 업로드하지 않았을시
    if (typeof req.file == "undefined") {
      res.redirect(`/user/${shortId}`);
      return;
    }

    //image는 각 유저의 데이터베이스에 직접 저장한다.
    try {
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
    } catch (err) {
      next(err);
    }
  })
);

// user 소개 변경

router.post(
  "/:shortId/change-intro",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const { intro } = req.body;
    try {
      await User.findOneAndUpdate({ shortId }, { introduce: intro });
      res.redirect(`/user/${shortId}`);
    } catch (err) {
      next(err);
    }
  })
);

// user 비밀번호 변경

router.post(
  "/:shortId/change-password",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    try {
      const author = await User.findOne({ shortId });

      // 비밀번호 입력에 대한 오류 처리
      if (currentPassword) {
        if (hashPassword(currentPassword) !== author.password) {
          res.send(
            "<script>alert('입력하신 비밀번호가 일치하지 않습니다.');history.back();</script>"
          );
          return;
        } else if (newPassword !== confirmNewPassword) {
          res.send(
            "<script>alert('변경할 비밀번호 확인이 일치하지 않습니다.');history.back();</script>"
          );
          return;
        }
      }

      // 입력이 올바르면 업데이트 실행
      await User.findOneAndUpdate(
        { shortId },
        {
          password: hashPassword(newPassword),
        }
      );
      res.redirect(`/user/${shortId}`);
    } catch (err) {
      next(err);
    }
  })
);

// user가 생성한 챌린지들 데이터 제공

router.get(
  "/:shortId/created",
  asyncHandler(async (req, res) => {
    const _page = req.query._page;
    const _limit = req.query._limit;
    const { shortId } = req.params;
    try {
      const author = await User.findOne({
        shortId,
      });

      // 모든 생성한 챌린지를 다 내려주는 것이 아닌, url query 값에 맞춰 부분적으로 끊어서 반환
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

          // 보안을 위해 모든 정보를 내리진 않고, 사용자에게 보여줄 정보만 골라낸 뒤 전송
          challenges.forEach((challenge) => {
            let b64 = Buffer.from(challenge.img.data).toString("base64");
            let challengeUrl = `http://elice-kdt-sw-1st-vm04.koreacentral.cloudapp.azure.com/detail/${challenge.shortId}`;
            const createdChallenge = {
              name: challenge.author.name,
              title: challenge.title,
              category: challenge.category,
              img: {
                contentType: challenge.img.contentType,
                data: b64,
              },
              url: challengeUrl,
              numJoined: challenge.joinusers.length,
              startdate: challenge.startdate,
              enddate: challenge.enddate,
            };

            createdChallenges.push(createdChallenge);
          });

          res.json(createdChallenges);
        }
      });
    } catch (err) {
      next(err);
    }
  })
);

// 유저가 참여한 챌린지들 데이터 제공

router.get(
  "/:shortId/joined",
  asyncHandler(async (req, res) => {
    const _page = req.query._page;
    const _limit = req.query._limit;
    const { shortId } = req.params;
    try {
      const user = await User.findOne({
        shortId,
      });
      // 모든 참여한 챌린지를 다 내려주는 것이 아닌, url query 값에 맞춰 부분적으로 끊어서 반환
      const challenges = Challenge.find({ joinusers: { $in: user } })
        .sort({ updatedAt: -1 })
        .populate("author", "name")
        .skip((_page - 1) * _limit)
        .limit(_limit);

      challenges.find({}, (err, challenges) => {
        if (err) {
          console.log(err);
          res.status(500).send("An error occurred", err);
        } else {
          const joinedChallenges = [];

          // 보안을 위해 모든 정보를 내리진 않고, 사용자에게 필요한 정보만 골라낸 뒤 전송
          challenges.forEach((challenge) => {
            let b64 = Buffer.from(challenge.img.data).toString("base64");
            let challengeUrl = `http://elice-kdt-sw-1st-vm04.koreacentral.cloudapp.azure.com/detail/${challenge.shortId}`;
            const joinedChallenge = {
              name: challenge.author.name,
              title: challenge.title,
              category: challenge.category,
              img: {
                contentType: challenge.img.contentType,
                data: b64,
              },
              url: challengeUrl,
              numJoined: challenge.joinusers.length,
              startdate: challenge.startdate,
              enddate: challenge.enddate,
            };

            joinedChallenges.push(joinedChallenge);
          });

          res.json(joinedChallenges);
        }
      });
    } catch (err) {
      next(err);
    }
  })
);

module.exports = router;
