const router = require('express').Router();
const user = require('./user');

// for users
router.use('/user', user);

module.exports = router;
