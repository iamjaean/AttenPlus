const { Router, response } = require("express");
const asyncHandler = require("../utils/async-handler");
const { User } = require("../models");
const hashPassword = require("../utils/hash-password");
const multer = require("multer");
const path = require("path");
const router = Router();

const storage = multer.diskStorage({
  destination: "public/assets/img/uploads",
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
  fileFilter: function (req, res, cb) {
    checkFileType(file, cb);
  },
}).single("profile");

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase);
  const mimetype = filetypes.test(file.mimetype);
  if (extname && extname) {
    return cb(null, true);
  } else {
    cb("Error: 이미지 파일이 아닙니다.");
  }
}

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

router.get(
  "/:shortId/userinfo",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const author = await User.findOne({ shortId });
    res.json(author);
  })
);

router.get(
  "/:shortId",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const author = await User.findOne({ shortId });
    const user = req.user;

    res.render("userpage", { author, user });
  })
);

router.post(
  "/:shortId/change-name",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const { name } = req.body;
    await User.findOneAndUpdate({ shortId }, { name: name });

    res.redirect(`/user/${shortId}`);
  })
);

router.post("/:ShortId/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      const { shortId } = req.params;
      const author = User.findOne({ shortId });
      res.render("userpage", { msg: err, author: author, user: author });
    } else {
      console.log(req.file);
      res.send("test");
    }
  });
});

router.post(
  "/:shortId/change-intro",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const { intro } = req.body;
    await User.findOneAndUpdate({ shortId }, { introduce: intro });
    res.redirect(`/user/${shortId}`);
  })
);

router.post(
  "/:shortId/change-password",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const author = await User.findOne({ shortId });

    if (currentPassword) {
      if (hashPassword(currentPassword) !== author.password) {
        console.log("입력하신 비밀번호가 일치하지 않습니다");
        res.redirect(`/user/${shortId}`);
        return;
      } else if (newPassword !== confirmNewPassword) {
        console.log("변경할 비밀번호 확인이 일치하지 않습니다.");
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

    res.redirect(`/user/${shortId}`);
  })
);

module.exports = router;
