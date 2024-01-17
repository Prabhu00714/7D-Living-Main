const express = require("express");

const QuestionAnswer = require("../models/QuestionAnswer");
const CategoryGroup = require("../models/CategoryGroup");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

const router = express.Router();

router.post("/post/each/category/qna", async (req, res) => {
  try {
    const jsonData = req.body;

    const categories = jsonData.map(({ category, questions }) => ({
      category,
      questions: questions.map(
        ({ questionnumber, questiontext, answers, image }) => ({
          questionnumber,
          questiontext,
          answers: answers.map(({ answer, results }) => ({
            answer,
            results,
          })),
          image,
        })
      ),
    }));

    const savedData = await QuestionAnswer.create(categories);

    res.json(savedData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/fetch", async (req, res) => {
  try {
    const result = await QuestionAnswer.find({});

    res.json(result);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get/each/category/qna/:categoryId", async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const categoryData = await QuestionAnswer.findById(categoryId);

    if (!categoryData) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(categoryData);
  } catch (error) {
    console.error("Error fetching category data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/update/each/category/qna", async (req, res) => {
  try {
    const jsonData = req.body;

    // Assuming the categoryId is passed in the request body
    const categoryId = jsonData.categoryId;

    // Find and update the existing document by categoryId
    const updatedCategory = await QuestionAnswer.findOneAndUpdate(
      { _id: categoryId },
      jsonData,
      { new: true, upsert: true } // Create a new document if it doesn't exist
    );

    res
      .status(200)
      .json({ message: "Data updated successfully!", updatedCategory });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Failed to update data" });
  }
});

router.delete("/delete/each/category/qna/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Check if the category exists
    const existingCategory = await QuestionAnswer.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Delete the category and its associated questions
    await existingCategory.deleteOne();

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/post/new/:modelType", async (req, res) => {
  try {
    const { header, description, image } = req.body;

    const { modelType } = req.params;
    console.log(modelType);

    let ItemModel;

    switch (modelType) {
      case "category":
        ItemModel = Category;
        break;
      case "categoryGroup":
        ItemModel = CategoryGroup;
        break;
      case "subCategory":
        ItemModel = SubCategory;
        break;
      default:
        return res.status(400).json({ error: "Invalid model type" });
    }

    const item = await ItemModel.create({
      [`${modelType}Heading`]: header,
      [`${modelType}Description`]: description,
      [`${modelType}Image`]: image,
    });

    res.status(200).json(item);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get/:modelType/:itemId", async (req, res) => {
  try {
    const { modelType, itemId } = req.params;
    let ItemModel;

    switch (modelType) {
      case "category":
        ItemModel = Category;
        break;
      case "categorygroup":
        ItemModel = CategoryGroup;
        break;
      case "subcategory":
        ItemModel = SubCategory;
        break;
      default:
        return res.status(400).json({ error: "Invalid model type" });
    }

    const item = await ItemModel.findById(itemId);
    res.json(item);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
