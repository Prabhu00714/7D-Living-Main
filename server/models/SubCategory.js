const mongoose = require("mongoose");

const subCategoriesSchema = new mongoose.Schema({
  questions: [questionId],
});

const subcategorySchema = new mongoose.Schema({
  categoryId: String,
  subCategoryHeading: String,
  subCategoryDescription: String,
  subCategoryImage: String,
  subCategory: [subCategoriesSchema],
});

const Category = mongoose.model("subCategory", categoryGroupSchema);

module.exports = CategoryGroup;
