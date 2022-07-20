const Board = require('../../models/board');

let boardItems = [];

exports.getAllBoards = async (req, res) => {
  const result = await Board.findAll();
  res.send(result);
};

exports.getBoardById = async (req, res) => {
  const boardId = req.params.id;
  const result = await Board.findOneById(boardId);
  res.send(result);
};

exports.postBoard = async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    res.status(400).send('Bad Request');
  }
  const result = await Board.createBoard({ title, content, author });
  res.send(result);
};
