const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  subCategoryId: String,
  questionId: String,
});

const categorySchema = new mongoose.Schema({
  categoryHeading: String,
  categoryDescription: String,
  categoryImage: String,
  categories: [categoriesSchema],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
