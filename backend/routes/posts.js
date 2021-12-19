const { Router } = require("express");
const { Post } = require("../models");
const multer = require("multer");
var fs = require("fs");
var path = require("path");
require("dotenv/config");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./routes/data/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage });

const router = Router();

router.get("/", async (req, res, next) => {
  res.render("createPage");
});
// 이미지 없이 나머지 내용들 확인 code
// router.post('/', async (req, res, next) => {
//   const { title, description, exercise_check, life_check, emotion_check,competency_check,hobby_check, startdate, enddate } = req.body;
//   const category_arr = [exercise_check, life_check, emotion_check,competency_check,hobby_check];
//   let category = "";
//   for(let i = 0; i < 5; i++){
//        if(category_arr[i]!==undefined){
//             category = category_arr[i];
//        }
//   }
//   try {
//     const post = await Post.create({
//         title,
//         description,
//         category,
//         startdate,
//         enddate,
//     });
//     res.redirect('/');
//   } catch (err) {
//     next(err);
//   }
// });

// 이미지 있는 code

router.post("/", upload.single("uploaded_file"), async (req, res, next) => {
  const {
    title,
    description,
    exercise_check,
    life_check,
    emotion_check,
    competency_check,
    hobby_check,
    startdate,
    enddate,
  } = req.body;
  const category_arr = [
    exercise_check,
    life_check,
    emotion_check,
    competency_check,
    hobby_check,
  ];
  const img = {
    data: fs.readFileSync(
      path.join(__dirname + "/data/uploads/" + req.file.filename)
    ),
    contentType: "image/png",
  };

  let category = "";
  for (let i = 0; i < 5; i++) {
    if (category_arr[i] !== undefined) {
      category = category_arr[i];
    }
  }
  try {
    const post = await Post.create({
      img,
      title,
      description,
      category,
      startdate,
      enddate,
    });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

// 사진 서버에 올리는 거 확인 code
// router.post('/', upload.single('uploaded_file'), function (req, res, next) {

//     console.log(req.file, req.body)
//  });

router.get("/:shortId", async (req, res, next) => {
  const { shortId } = req.params;
  const post = await Post.findOne({
    shortId,
  });

  res.send(post);
});

router.post("/:shortId", async (req, res, next) => {
  const { shortId } = req.params;
  const { title, description, category, startdate, enddate } = req.body;

  try {
    await Post.updateOne(
      { shortId },
      {
        title,
        description,
        category,
        startdate,
        enddate,
      }
    );
    res.redirect(`/posts/${shortId}`);
  } catch (err) {
    next(err);
  }
});

router.delete("/:shortId", async (req, res, next) => {
  const { shortId } = req.params;
  await Post.deleteOne({ shortId });
  res.send("OK");
});
module.exports = router;

// 챌린지로 바꾸려고 하는 code

// const { Router } = require('express');
// const { Challenge } = require('../models');

// const router = Router();

// router.get('/', async (req, res, next) => {
//   const posts = await Challenge.find({});
//   res.json(posts);
// });

// router.post('/', async (req, res, next) => {
//   const { title, description, category, startdate, enddate } = req.body;

//   try {
//     const post = await Challenge.create({
//         title,
//         description,
//         category,
//         startdate,
//         enddate,
//     });
//     res.json(Challenge);
//   } catch (err) {
//     next(err);
//   }
// });

// router.get('/:shortId', async (req, res, next) => {
//     const { shortId } = req.params;
//     const post = await Challenge.findOne({
//       shortId,
//     });

//     res.send(post);
// });

// router.post('/:shortId', async (req, res, next) => {
//     const { shortId } = req.params;
//     const { title, description, category, startdate, enddate } = req.body;

//     try {
//       await Challenge.updateOne({shortId}, {
//         title,
//         description,
//         category,
//         startdate,
//         enddate,
//       });
//       res.redirect(`/posts/${shortId}`);
//     } catch (err) {
//       next(err);
//     }
// });

// router.delete('/:shortId', async (req, res, next) => {
//     const { shortId } = req.params;
//     await Challenge.deleteOne({ shortId });
//     res.send('OK');
// });
// module.exports = router;
