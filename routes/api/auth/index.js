const router = require('express').Router();
const controller = require('./auth.controller');

router.post('/signup', controller.postSignUp);
router.post('/signin', controller.postSignIn);

module.exports = router;
