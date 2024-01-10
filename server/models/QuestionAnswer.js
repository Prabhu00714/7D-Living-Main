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
  questionid: {
    type: mongoose.Schema.Types.ObjectId,
  },
  questionnumber: Number,
  questiontext: String,
  answers: [answerSchema],
  image: String,
});

const categorySchema = new mongoose.Schema({
  categoryid: {
    type: mongoose.Schema.Types.ObjectId,
  },
  category: String,
  questions: [questionSchema],
});

const QuestionAnswer = mongoose.model("QuestionAnswer", categorySchema);

module.exports = QuestionAnswer;
