const KakaoStrategy = require("passport-kakao").Strategy;
const { User, OAuth } = require("../../models");
require("dotenv").config();
const generateRandomPassword = require("../../utils/generate-random-password");
const hashPassword = require("../../utils/hash-password");
const path = require("path");
const fs = require("fs");
const config = {
  clientID: process.env.KAKAO_clientID,
  callbackURL: process.env.KAKAO_CALLBACK,
};

async function findOrCreateUser({ name, email, imgURL }) {
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

const kakao = new KakaoStrategy(
  config,
  async (accessToken, refreshToken, profile, done) => {
    const email = profile._json.kakao_account.email;
    const name = profile._json.kakao_account.profile.nickname;
    const imgURL = profile._json.kakao_account.profile.profile_image_url;
    try {
      const user = await findOrCreateUser({ email, name, imgURL });
      done(null, {
        shortId: user.shortId,
        img: imgURL,
        email: user.email,
        name: user.name,
      });
    } catch (e) {
      done(e, null);
    }
  }
);

module.exports = kakao;
