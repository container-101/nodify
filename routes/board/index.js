const router = require('express').Router();
const controller = require('./board.controller');
const authMiddleware = require('../../middlewares/auth');

router.get('/', controller.getAllBoards);
router.get('/:id', controller.getBoardById);
router.post('/', authMiddleware, controller.postBoard);

module.exports = router;
