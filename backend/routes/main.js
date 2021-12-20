const express = require('express');
const router = express.Router();
const challenge = require('../models/schemas/challenge');

router.get('/', async (req, res, next) => {
  try {
    const challenges = await challenge.find()
    res.render('mainPage', {data: challenges});
  } catch (err) {
    console.error(err);
    next(err);
  }
})

module.exports = router;
