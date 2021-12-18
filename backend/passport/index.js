const passport = require("passport");

const kakao = require("./strategies/kakao");
const google = require("./strategies/google");

module.exports = () => {
  passport.use(google);
  passport.use(kakao);
};
