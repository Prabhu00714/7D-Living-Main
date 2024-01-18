const mongoose = require("mongoose");

const subCategoriesSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Qna",
  },
});

const subCategorySchema = new mongoose.Schema({
  subCategoryHeading: String,
  subCategoryDescription: String,
  subCategoryImage: String,
  questions: [subCategoriesSchema],
});

const SubCategory = mongoose.model(
  "SubCategory",
  subCategorySchema,
  "SubCategory"
);

module.exports = SubCategory;
