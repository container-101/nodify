const router = require('express').Router();
const controller = require('./auth.controller');
const authMiddleware = require('../../middlewares/auth');

router.use('/', authMiddleware);
router.get('/', controller.check);

router.post('/signup', controller.postSignUp);
router.post('/signin', controller.postSignIn);

module.exports = router;
