const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  result: String,
  value: Number,
});

const aggregatedResultSchema = new mongoose.Schema({
  resultName: String,
  totalScore: Number,
});

const questionSchema = new mongoose.Schema({
  questionid: String,
  answerid: String,
  results: [resultSchema],
  aggregatedResults: [aggregatedResultSchema],
});

const categorySchema = new mongoose.Schema({
  username: String,
  categoryid: String,
  questions: [questionSchema],
});

const ResultModel = mongoose.model("Result", categorySchema);

module.exports = ResultModel;
