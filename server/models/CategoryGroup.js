const mongoose = require("mongoose");

const categoryGroupsSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const categoryGroupSchema = new mongoose.Schema({
  prompt: String,
  categoryGroupHeading: String,
  categoryGroupDescription: String,
  categoryGroupImage: String,
  categoryGroups: [categoryGroupsSchema],
});

const CategoryGroup = mongoose.model(
  "CategoryGroup",
  categoryGroupSchema,
  "CategoryGroup"
);

module.exports = CategoryGroup;
