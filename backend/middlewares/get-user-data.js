const { User } = require("../models");

const getUser = async (req, res, next) => {
  if (req.user) {
    try {
      const user = await User.findOne({
        shortId: req.user.shortId,
      });

      return user;
    } catch (e) {
      next(e);
    }
  }

  next();
};

module.exports = getUser;
