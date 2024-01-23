const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  result: String,
  value: Number,
});

const aggregatedResultSchema = new mongoose.Schema({
  resultName: String,
  totalScore: Number,
});

const userresultsSchema = new mongoose.Schema({
  questionId: String,
  answerId: String,
  results: [resultSchema],
  aggregatedResults: [aggregatedResultSchema],
});

const userresultSchema = new mongoose.Schema({
  username: String,
  userresults: [userresultsSchema],
});

const UserResult = mongoose.model("UserResult", userresultSchema, "UserResult");

module.exports = UserResult;
