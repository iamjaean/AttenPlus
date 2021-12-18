const { Router } = require("express");
const passport = require("passport");
const { setUserToken } = require("../utils/jwt");

const router = Router();

router.post(
  "/",
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
    setUserToken(res, req.user);
    res.redirect("/");
  }
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    // setUserToken(res, req.user);
    res.redirect("/");
  }
);

router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", { session: false }),
  (req, res, next) => {
    setUserToken(res, req.user);
    res.redirect("/");
  }
);

router.get("/success", (req, res) => {
  res.send(req.body);
});
module.exports = router;
