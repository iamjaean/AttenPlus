const passport = require("passport");

const kakao = require("./strategies/kakao");
const google = require("./strategies/google");
const local = require("./strategies/local");
const jwt = require("./strategies/jwt");

module.exports = () => {
  passport.use(google);
  passport.use(kakao);
  passport.use(local);
  passport.use(jwt);
};
