const jwt = require('jsonwebtoken');
const User = require('../../models/user');

exports.authCheck = (req, res) => {
  return res.json({
    success: true,
    info: req.decoded,
  });
};

exports.postSignUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const findUserResult = await User.findOneByUsername(username);
    if (findUserResult) {
      throw new Error('username already exists');
    }
    const createUserResult = await User.create(username, password);
    res.send({
      message: 'sign up successfully',
    });
  } catch (err) {
    res.status(409).json({
      message: err.message,
    });
  }
};

exports.postSignIn = async (req, res) => {
  const { username, password } = req.body;
  const secret = req.app.get('jwt-secret');
  const options = {
    expiresIn: 60 * 60 * 24,
    issuer: 'cnt101',
  };

  try {
    const findUserResult = await User.findOneByUsername(username);
    if (!findUserResult) {
      throw new Error('username does not exist');
    }
    if (await findUserResult.verify(password)) {
      const token = jwt.sign(
        {
          username,
        },
        secret,
        options
      );
      res.send({
        message: 'sign in successfully',
        token,
      });
    } else {
      throw new Error('password is incorrect');
    }
  } catch (err) {
    res.status(403).json({
      message: err.message,
    });
  }
};
