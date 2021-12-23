module.exports = (req, res, next) => {
  if (!req.user) {
    res.send(
      `<script>alert('로그인 후 이용해주세요.');location.href='/sign';</script>`
    );
    return;
  }

  next();
};
