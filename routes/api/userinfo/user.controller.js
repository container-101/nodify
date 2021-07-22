// const User = require('../../../models/user');

/* 
    GET /api/userinfo
*/

exports.check = (req, res) => {
  res.json({
    success: true,
    info: req.decoded,
  });
};

// for admin functions
/* 
    GET /api/userinfo/list
*/

// exports.list = (req, res) => {
//   // refuse if not an admin
//   if (!req.decoded.admin) {
//     return res.status(403).json({
//       message: 'you are not an admin',
//     });
//   }

//   User.find({}).then((users) => {
//     res.json({ users });
//   });
// };

/*
    POST /api/userinfo/assign-admin/:username
*/

// exports.assignAdmin = (req, res) => {
//   console.log(req);
//   // refuse if not an admin
//   if (!req.decoded.admin) {
//     return res.status(403).json({
//       message: 'you are not an admin',
//     });
//   }

//   User.findOneByUsername(req.params.username)
//     .then((user) => user.assignAdmin)
//     .then(
//       res.json({
//         success: true,
//       })
//     );
// };
