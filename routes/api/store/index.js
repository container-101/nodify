const router = require('express').Router();
const controller = require('./store.controller');

router.post('/signup', controller.postSignUp);
router.post('/signin', controller.postSignIn);

router.get('/orderlist', controller.getOrderList);
router.get('/solidlist', controller.getSoldList);
router.post('/ordermanage', controller.postOrderManage);
router.get('/storeinfo', controller.getStoreInfo);
router.put('/storeinfo', controller.putStoreInfo);

module.exports = router;
