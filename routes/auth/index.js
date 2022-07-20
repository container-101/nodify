const router = require('express').Router();
const controller = require('./auth.controller');
const authMiddleware = require('../../middlewares/auth');

router.get('/', authMiddleware, controller.authCheck);

router.post('/signup', controller.postSignUp);
router.post('/signin', controller.postSignIn);

module.exports = router;
