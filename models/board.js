const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = new Schema({
  title: String,
  content: String,
  author: String,
});

Board.statics.createBoard = function ({ title, content, author }) {
  const board = new this({
    title,
    content,
    author,
  });
  board.save();
  return board;
};

Board.statics.findOneByAuthor = function (author) {
  return this.findOne({
    author,
  }).exec();
};

Board.statics.findOneById = function (id) {
  return this.findOne({
    _id: id,
  }).exec();
};

Board.statics.findAll = function () {
  return this.find().exec();
};

module.exports = mongoose.model('Board', Board);
