const mongoose = require("mongoose");

const categoryGroupsSchema = new mongoose.Schema({
  categoryId: String,
});

const categoryGroupSchema = new mongoose.Schema({
  categoryGroupHeading: String,
  categoryGroupDescription: String,
  categoryGroupImage: String,
  categoryGroups: [categoryGroupsSchema],
});

const CategoryGroup = mongoose.model("CategoryGroup", categoryGroupSchema);

module.exports = CategoryGroup;
