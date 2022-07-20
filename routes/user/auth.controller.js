const jwt = require('jsonwebtoken');
const User = require('../../models/user');

exports.check = (req, res) => {
  return res.json({
    success: true,
    info: req.decoded,
  });
};

exports.postSignUp = (req, res) => {
  const { username, password } = req.body;

  // create a new user if does not exist
  const create = (user) => {
    if (user) {
      throw new Error('username exists');
    } else {
      return User.create(username, password);
    }
  };

  // respond to the client
  const respond = () => {
    res.json({
      message: 'registered successfully',
    });
  };

  // run when there is an error (username exists)
  const onError = (error) => {
    res.status(409).json({
      message: error.message,
    });
  };

  // check username duplication
  User.findOneByUsername(username).then(create).then(respond).catch(onError);
};

exports.postSignIn = (req, res) => {
  const { username, password } = req.body;
  const secret = req.app.get('jwt-secret');
  const options = {
    expiresIn: 60 * 60 * 24,
    issuer: 'cnt101',
  };

  // check the user info & generate the jwt
  const check = (user) => {
    if (!user) {
      // user does not exist
      throw new Error('login failed');
    } else {
      // user exists, check the password
      if (user.verify(password)) {
        // create a promise that generates jwt asynchronously
        const p = new Promise((resolve, reject) => {
          jwt.sign(
            {
              _id: user._id,
              username: user.username,
              admin: user.admin,
            },
            secret,
            options,
            (err, token) => {
              if (err) reject(err);
              resolve(token);
            }
          );
        });
        return p;
      } else {
        throw new Error('login failed');
      }
    }
  };

  // respond the token
  const respond = (token) => {
    res.json({
      message: 'logged in successfully',
      token,
    });
  };

  // error occured
  const onError = (error) => {
    res.status(403).json({
      message: error.message,
    });
  };

  // find the user
  User.findOneByUsername(username).then(check).then(respond).catch(onError);
};

/*
    GET /api/user/orderlist
*/

exports.getOrderList = (req, res) => {
  console.log('do something here');
  // respond to the client
  res.json({
    message: 'success',
  });
};
