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
  questionnumber: Number,
  questiontext: String,
  answers: [answerSchema],
  image: String,
});

const categorySchema = new mongoose.Schema({
  category: String,
  questions: [questionSchema],
});

const QuestionAnswer = mongoose.model("QuestionAnswer", categorySchema);

module.exports = QuestionAnswer;
