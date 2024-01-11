const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  resultid: {
    type: mongoose.Schema.Types.ObjectId,
  },
  result: String,
  value: String,
});

const answerSchema = new mongoose.Schema({
  answerid: {
    type: mongoose.Schema.Types.ObjectId,
  },
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
