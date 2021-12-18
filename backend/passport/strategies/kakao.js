const KakaoStrategy = require("passport-kakao").Strategy;
const { User, OAuth } = require("../../models");

const config = {
  clientID: "8f0f0f5a6feaa2bf566b547b6df5e468",
  callbackURL: "/auth/kakao/callback",
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
    password: "KAKAO_OAUTH",
  });
  return created;
}

const kakao = new KakaoStrategy(
  config,
  async (accessToken, refreshToken, profile, done) => {
    const email = profile._json.kakao_account.email;
    const name = profile._json.kakao_account.profile.nickname;
    console.log(email, name);
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

module.exports = kakao;
