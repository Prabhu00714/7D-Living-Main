const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  questions: [questionSchema],
});

const categorySchema = new mongoose.Schema({
  categoryHeading: String,
  categoryDescription: String,
  categoryImage: String,
  category: [categoriesSchema],
});

const Category = mongoose.model("Category", categoryGroupSchema);

module.exports = CategoryGroup;
