const router = require('express').Router();
const authMiddleware = require('../../middlewares/auth');
const auth = require('./auth');
const user = require('./user');
const menu = require('./menu');
const store = require('./store');

// for users
router.use('/user', auth);
router.use('/userinfo', authMiddleware);
router.use('/userinfo', user);

// for menu
// when ordering food, require authorization
router.use('/menu', authMiddleware);
router.use('/menu', menu);

// for store
router.use('/store', store);

module.exports = router;
