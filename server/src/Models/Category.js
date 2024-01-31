const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Qna",
  },
});

const categorySchema = new mongoose.Schema({
  prompt: String,
  categoryHeading: String,
  categoryDescription: String,
  categoryImage: String,
  categories: [categoriesSchema],
});

const Category = mongoose.model("Category", categorySchema, "Category");

module.exports = Category;
