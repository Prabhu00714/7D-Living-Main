const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  topicCode: String,
  topicHeading: String,
  topicDescription: String,
  topicImage: String,
});

const Topic = mongoose.model("Topic", topicSchema, "Topic");

module.exports = Topic;
