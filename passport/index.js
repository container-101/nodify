const passport = require('passport');
// const local = require('./localStrategy');
// const kakao = require('./kakaoStrategy');
const User = require('../models/user');

// done의 첫번째 인자는 에러, 두번째 인자는 저장하고 싶은 데이터
// 성공시 req.user에 담긴다
module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
};
