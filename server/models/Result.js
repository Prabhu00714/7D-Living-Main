const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  result: String,
  value: String,
});

const answerSchema = new mongoose.Schema({
  answer: String,
  results: [resultSchema],
});

const questionSchema = new mongoose.Schema({
  questionid: Number,
  questiontext: String,
  answers: [answerSchema],
});

const categorySchema = new mongoose.Schema({
  username: String,
  category: String,
  questions: [questionSchema],
});

const ResultModel = mongoose.model("Result", categorySchema);

module.exports = ResultModel;
