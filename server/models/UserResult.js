const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  result: String,
  value: Number,
});

const questionSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Qna",
  },
  answerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Qna",
  },
  results: [resultSchema],
});

const aggregatedResultSchema = new mongoose.Schema({
  resultName: String,
  totalScore: Number,
});

const userresultsSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  questions: [questionSchema],
  aggregatedResults: [aggregatedResultSchema],
});

const userresultSchema = new mongoose.Schema({
  username: String,
  userresults: [userresultsSchema],
});

const UserResult = mongoose.model("UserResult", userresultSchema, "UserResult");

module.exports = UserResult;
