const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../../models");
const hashPassword = require("../../utils/hash-password");
const crypto = require("crypto");

const config = {
  usernameField: "email",
  passwordField: "password",
};

const local = new LocalStrategy(config, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false);
    }

    if (
      !crypto.timingSafeEqual(
        Buffer.from(user.password),
        Buffer.from(hashPassword(password))
      )
    ) {
      return done(null, false);
    }

    done(null, {
      shortId: user.shortId,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    done(err, null);
  }
});

module.exports = local;
