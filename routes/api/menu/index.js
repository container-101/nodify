const router = require('express').Router();
const controller = require('./menu.controller');

router.get('/menulist', controller.getMenuList);
router.post('/order', controller.postOrder);

module.exports = router;
