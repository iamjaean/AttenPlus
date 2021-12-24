const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User, OAuth } = require("../../models");
const generateRandomPassword = require("../../utils/generate-random-password");
const hashPassword = require("../../utils/hash-password");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const config = {
  clientID: process.env.GOOGLE_clientID,
  clientSecret: process.env.GOOGLE_secret,
  callbackURL: process.env.GOOGLE_CALLBACK,
};

async function findOrCreateUser({ name, email }) {
  const user = await User.findOne({
    email,
  });

  if (user) {
    return user;
  }

  const created = await User.create({
    name,
    email,
    password: hashPassword(generateRandomPassword()),
    img: {
      data: fs.readFileSync(
        path.join(__dirname, "../", "../public/assets/img/img-user-default.png")
      ),
      contentType: "image/png",
    },
  });

  return created;
}

module.exports = new GoogleStrategy(
  config,
  async (accessToken, refreshToken, profile, done) => {
    const { email, name } = profile._json;

    try {
      const user = await findOrCreateUser({ email, name });
      done(null, {
        shortId: user.shortId,
        email: user.email,
        name: user.name,
      });
    } catch (e) {
      done(e, null);
    }
  }
);
