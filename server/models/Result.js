const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  result: String,
  value: Number,
});

const questionSchema = new mongoose.Schema({
  questionid: String,
  answerid: String,
  results: [resultSchema],
});

const aggregatedResultSchema = new mongoose.Schema({
  resultName: String,
  totalScore: Number,
});

const categorySchema = new mongoose.Schema({
  username: String,
  categoryid: String,
  questions: [questionSchema],
  aggregatedResults: [aggregatedResultSchema],
});

const ResultModel = mongoose.model("Result", categorySchema);

module.exports = ResultModel;
