const mongoose = require("mongoose");

const subCategoriesSchema = new mongoose.Schema({
  questionId: String,
});

const subCategorySchema = new mongoose.Schema({
  subCategoryHeading: String,
  subCategoryDescription: String,
  subCategoryImage: String,
  subCategory: [subCategoriesSchema],
});

const subCategory = mongoose.model("subCategory", subCategorySchema);

module.exports = subCategory;
