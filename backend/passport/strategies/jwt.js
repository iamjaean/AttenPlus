const JwtStrategy = require("passport-jwt").Strategy;
require("dotenv").config();
const cookieExtractor = (req) => {
  const { token } = req.cookies;
  return token;
};

const opts = {
  secretOrKey: process.env.jwtSecretKey,
  jwtFromRequest: cookieExtractor,
};

module.exports = new JwtStrategy(opts, (user, done) => {
  done(null, user);
});
