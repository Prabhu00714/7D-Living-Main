const express = require("express");

const QuestionAnswer = require("../models/QuestionAnswer");
const CategoryGroup = require("../models/CategoryGroup");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const QNA = require("../models/QNA");
const Topic = require("../models/Topic");

const router = express.Router();

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

// new structure codes

router.get("/get/all/categorygroup", async (req, res) => {
  try {
    const categoryGroups = await CategoryGroup.find({});
    res.json(categoryGroups);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/get/all/category/:categorygroupId", async (req, res) => {
  try {
    const { categorygroupId } = req.params;

    const categoryGroup = await CategoryGroup.findById(categorygroupId);

    if (!categoryGroup) {
      return res.status(404).json({ error: "CategoryGroup not found" });
    }

    const categoryIds = categoryGroup.categoryGroups.map(
      (CategoryGroup) => CategoryGroup.categoryId
    );

    const categories = await Category.find({ _id: { $in: categoryIds } });

    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get/all/subcategory/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const subCategoryIds = category.categories.map(
      (Category) => Category.subCategoryId
    );

    const subcategories = await SubCategory.find({
      _id: { $in: subCategoryIds },
    });

    res.json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get(
  "/get/each/subcategory/questions/:subcategoryId",
  async (req, res) => {
    try {
      const { subcategoryId } = req.params;

      const subcategory = await SubCategory.findById(subcategoryId);

      if (!subcategory) {
        return res.status(404).json({ error: "SubCategory not found" });
      }

      const questionIds = subcategory.questions.map(
        (question) => question.questionId
      );

      const questions = await QNA.find({
        _id: { $in: questionIds },
      });

      res.json(questions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get("/get/all/question", async (req, res) => {
  try {
    const result = await QNA.find({});

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/post/new/categorygroup", async (req, res) => {
  try {
    const { header, description, image } = req.body;

    const item = await CategoryGroup.create({
      categoryGroupHeading: header,
      categoryGroupDescription: description,
      categoryGroupImage: image,
    });

    res.status(200).json(item);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/post/new/category/:categorygroupId", async (req, res) => {
  try {
    const { header, description, image } = req.body;
    const { categorygroupId } = req.params;

    // Create a new Category
    const newCategory = await Category.create({
      categoryHeading: header,
      categoryDescription: description,
      categoryImage: image,
    });

    // Find the CategoryGroup by ID and update its categoryGroups array
    const updatedCategoryGroup = await CategoryGroup.findByIdAndUpdate(
      categorygroupId,
      {
        $push: {
          categoryGroups: {
            categoryId: newCategory._id,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({ newCategory, updatedCategoryGroup });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/post/new/subcategory/:categoryId", async (req, res) => {
  try {
    const { header, description, image } = req.body;
    const { categoryId } = req.params;

    const newSubCategory = await SubCategory.create({
      subCategoryHeading: header,
      subCategoryDescription: description,
      subCategoryImage: image,
    });

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        $push: {
          categories: {
            subCategoryId: newSubCategory._id,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({ newSubCategory, updatedCategory });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get/edit/:modelType/:itemId", async (req, res) => {
  try {
    const { modelType, itemId } = req.params;
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

    const item = await ItemModel.findById(itemId);
    res.json(item);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/post/edit/:modelType/:itemId", async (req, res) => {
  try {
    const { modelType, itemId } = req.params;

    let Model;

    switch (modelType) {
      case "categoryGroup":
        Model = CategoryGroup;
        break;
      case "category":
        Model = Category;
        break;
      case "subCategory":
        Model = SubCategory;
        break;
      default:
        return res.status(400).json({ error: "Invalid model type" });
    }

    // Create the update data object based on the modelType
    const updateData = {
      [`${modelType}Heading`]: req.body.header,
      [`${modelType}Description`]: req.body.description,
      [`${modelType}Image`]: req.body.image,
    };

    const updatedItem = await Model.findByIdAndUpdate(itemId, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/post/questions/:subcategoryId", async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    const selectedQuestionsArray = req.body.questions;
    const formattedQuestionIds = selectedQuestionsArray.map(
      (question) => question._id
    );

    const subCategory = await SubCategory.findById(subcategoryId);

    // Check for duplicates
    const newQuestionIds = formattedQuestionIds.filter((questionId) => {
      return !subCategory.questions.some((existingQuestion) =>
        existingQuestion.questionId.equals(questionId)
      );
    });

    if (newQuestionIds.length === 0) {
      return res.status(200).json({ updatedSubCategory: subCategory });
    }

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      subcategoryId,
      {
        $addToSet: {
          questions: {
            $each: newQuestionIds.map((questionId) => ({ questionId })),
          },
        },
      },
      { new: true }
    );

    res.status(200).json({ updatedSubCategory });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete(
  "/delete/subcategory/question/:subcategoryId/:questionId",
  async (req, res) => {
    try {
      const subcategoryId = req.params.subcategoryId;
      const questionId = req.params.questionId;

      const existingSubCategory = await SubCategory.findById(subcategoryId);
      if (!existingSubCategory) {
        return res.status(404).json({ error: "Subcategory not found" });
      }

      existingSubCategory.questions = existingSubCategory.questions.filter(
        (question) => !question.questionId.equals(questionId)
      );

      await existingSubCategory.save();

      res.status(200).json({
        message: "Question deleted successfully",
        updatedSubCategory: existingSubCategory,
      });
    } catch (error) {
      console.error("Error deleting question:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.delete("/delete/subcategory/:subcategoryId", async (req, res) => {
  try {
    const subcategoryId = req.params.subcategoryId;

    const existingSubCategory = await SubCategory.findById(subcategoryId);
    if (!existingSubCategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    await existingSubCategory.deleteOne();

    res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete/category/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    const subcategoryIds = existingCategory.categories.map(
      (subcategory) => subcategory.subCategoryId
    );

    await SubCategory.deleteMany({ _id: { $in: subcategoryIds } });

    await existingCategory.deleteOne();

    res.status(200).json({
      message: "Category and associated subcategories deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete/categorygroup/:categorygroupId", async (req, res) => {
  try {
    const categorygroupId = req.params.categorygroupId;

    const existingCategoryGroup = await CategoryGroup.findById(categorygroupId);
    if (!existingCategoryGroup) {
      return res.status(404).json({ error: "CategoryGroup not found" });
    }

    // Find associated Category IDs
    const categoryIds = existingCategoryGroup.categoryGroups.map(
      (categoryGroup) => categoryGroup.categoryId
    );

    // Find and delete associated SubCategory documents
    const subcategoryIds = await Category.find({
      _id: { $in: categoryIds },
    }).distinct("categories.subCategoryId");
    await SubCategory.deleteMany({ _id: { $in: subcategoryIds } });

    // Delete associated Category documents
    await Category.deleteMany({ _id: { $in: categoryIds } });

    // Delete the CategoryGroup
    await existingCategoryGroup.deleteOne();

    res.status(200).json({
      message:
        "CategoryGroup and associated Categories/Subcategories deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category group:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get/all/category", async (req, res) => {
  try {
    const result = await Category.find({});

    res.json(result);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get/each/category/questions/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "category not found" });
    }

    const questionIds = category.categories.map(
      (categoryItem) => categoryItem.questionId
    );

    const questions = await QNA.find({
      _id: { $in: questionIds },
    });

    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/post/each/category/qna/:categoryId", async (req, res) => {
  try {
    const jsonData = req.body;

    const savedData = await Promise.all(
      jsonData.map(async ({ questiontext, questionimage, answers }) => {
        const existingQuestion = await QNA.findOne({ questiontext });

        if (existingQuestion) {
          // If questiontext already exists, return an error response
          return {
            error: `Question with text '${questiontext}' already exists.`,
          };
        }

        // Create a new question with questionimage
        const savedQuestion = await QNA.create({
          questiontext,
          questionimage,
          answers: answers.map(({ answer, answerimage, results }) => {
            return {
              answer,
              answerimage,
              results,
            };
          }),
        });

        // Update or create category with the new questionId
        const category = await Category.findByIdAndUpdate(
          req.params.categoryId,
          {
            $push: {
              categories: {
                questionId: savedQuestion._id,
              },
            },
          },
          { new: true, upsert: true }
        );

        return savedQuestion;
      })
    );

    res.json(savedData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get/each/question/:questionId", async (req, res) => {
  const questionId = req.params.questionId;

  try {
    const result = await QNA.findById(questionId);
    res.json(result);
  } catch (error) {
    console.error("Error fetching category data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/update/each/question/:questionId", async (req, res) => {
  const questionId = req.params.questionId;
  const questionData = req.body;

  try {
    const updatedQuestion = await QNA.findByIdAndUpdate(
      questionId,
      {
        $set: {
          questiontext: questionData.questiontext,
          answers: questionData.answers,
          questionimage: questionData.questionimage,
        },
      },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(updatedQuestion);
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete(
  "/delete/category/question/:categoryId/:questionId",
  async (req, res) => {
    try {
      const { categoryId, questionId } = req.params;

      await Category.updateOne(
        { _id: categoryId },
        { $pull: { categories: { questionId: questionId } } }
      );

      // Assuming you have a Qna model and want to delete a specific question by ID
      await QNA.findByIdAndDelete(questionId);

      res.status(200).json({ message: "Question Deleted Successfully" });
    } catch (error) {
      console.error("Error deleting question", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.delete(
  "/delete/categoryonly/question/:categoryId/:questionId",
  async (req, res) => {
    try {
      const { categoryId, questionId } = req.params;

      // Assuming you have a Category model and want to remove a specific question ID from a category
      await Category.updateOne(
        { _id: categoryId },
        { $pull: { categories: { questionId: questionId } } }
      );

      res
        .status(200)
        .json({ message: "Question ID Removed from Category Successfully" });
    } catch (error) {
      console.error("Error removing question ID from category", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get("/get/topic/edit/:topicId", async (req, res) => {
  try {
    const { topicId } = req.params;
    console.log("topicId", topicId);

    const item = await Topic.findById(topicId);
    res.json(item);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get/all/topics", async (req, res) => {
  try {
    const topics = await Topic.find({});
    res.json(topics);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/post/new/topic", async (req, res) => {
  try {
    const { header, description, image } = req.body;

    const newTopic = await Topic.create({
      topicHeading: header,
      topicDescription: description,
      topicImage: image,
    });

    // Send a response with the new topic or a success message
    res.status(200).json({ message: "Topic created successfully", newTopic });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/post/topic/edit/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;

    // Create the update data object based on the modelType
    const updateData = {
      topicHeading: req.body.header,
      topicDescription: req.body.description,
      topicImage: req.body.image,
    };

    const updatedItem = await Topic.findByIdAndUpdate(itemId, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete/topic/:topicId", async (req, res) => {
  try {
    const topicId = req.params.topicId; // Fix: Use req.params.topicId

    const existingTopic = await Topic.findById(topicId);
    if (!existingTopic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    await existingTopic.deleteOne();

    res.status(200).json({ message: "Topic deleted successfully" }); // Add a response
  } catch (error) {
    console.error("Error deleting topic:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
