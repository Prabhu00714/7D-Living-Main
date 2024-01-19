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

const qnaSchema = new mongoose.Schema({
  questiontext: String,
  questionimage: String,
  answers: [answerSchema],
});

const Qna = mongoose.model("qna", qnaSchema, "Qna");

module.exports = Qna;
