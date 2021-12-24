const { Router } = require("express");
const { Challenge } = require("../models");

const router = Router();

router.get("/", async (req, res, next) => {
   const challenges = Challenge.find({}).sort({createdAt: -1}).populate('author').populate('joinusers');
   try{
      challenges.find({}, (err, challenges) => {
         if (err) {
         console.log(err);
         res.status(500).send('An error occurred', err);
         }
         else {
            res.render('mainPage_test', { challenges: challenges });
         }
      });
   }
   catch(err){
      next(err);
   }
});

module.exports = router;
