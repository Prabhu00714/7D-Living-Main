const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  result: String,
  value: String,
});

const answerSchema = new mongoose.Schema({
  answer: String,
  answerimage: String,
  results: [resultSchema],
});

const questionSchema = new mongoose.Schema({
  questionnumber: Number,
  questiontext: String,
  answers: [answerSchema],
  questionimage: String,
});

const qnaSchema = new mongoose.Schema({
  questions: [questionSchema],
});

const QuestionAnswer = mongoose.model("QNA", qnaSchema);

module.exports = QuestionAnswer;
