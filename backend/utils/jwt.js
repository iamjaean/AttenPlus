const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.jwtSecretKey;

exports.setUserToken = (res, user) => {
  const token = jwt.sign(user, secret);
  res.cookie("token", token);
};
