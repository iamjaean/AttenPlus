const { Router, response } = require("express");
const asyncHandler = require("../utils/async-handler");
const { User } = require("../models");
const hashPassword = require("../utils/hash-password");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = Router();

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

module.exports = router;
