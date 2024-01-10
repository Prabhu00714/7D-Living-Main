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
  questionid: String,
  answers: [answerSchema],
});

const categorySchema = new mongoose.Schema({
  username: String,
  categoryid: String,
  questions: [questionSchema],
});

const ResultModel = mongoose.model("Result", categorySchema);

module.exports = ResultModel;
