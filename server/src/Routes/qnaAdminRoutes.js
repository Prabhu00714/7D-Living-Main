const express = require("express");
const router = express.Router();

const CategoryGroup = require("../Models/CategoryGroup");
const Category = require("../Models/Category");
const SubCategory = require("../Models/SubCategory");
const QNA = require("../Models/QNA");
const Topic = require("../Models/Topic");
const UserResult = require("../Models/UserResult");

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
    const { prompt, header, description, image } = req.body;

    const item = await CategoryGroup.create({
      prompt: prompt,
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
    const { prompt, header, description, image } = req.body;
    const { categorygroupId } = req.params;

    // Create a new Category
    const newCategory = await Category.create({
      prompt: prompt,
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
    const { prompt, header, description, image } = req.body;
    const { categoryId } = req.params;

    const newSubCategory = await SubCategory.create({
      prompt: prompt,
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
      [`prompt`]: req.body.prompt,
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

    // Find the categories that reference this subcategory
    const categoriesWithSubcategory = await Category.find({
      "categories.subCategoryId": subcategoryId,
    });

    // Remove the subcategory reference from each category
    for (const category of categoriesWithSubcategory) {
      category.categories = category.categories.filter(
        (cat) => String(cat.subCategoryId) !== subcategoryId
      );
      await category.save();
    }

    // Delete the subcategory
    await existingSubCategory.deleteOne();

    res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    console.error("Error deleting subcategory:", error);
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

    // Find the CategoryGroups that reference this category
    const categoryGroupsWithCategory = await CategoryGroup.find({
      "categoryGroups.categoryId": categoryId,
    });

    // Remove the category reference from each CategoryGroup
    for (const categoryGroup of categoryGroupsWithCategory) {
      categoryGroup.categoryGroups = categoryGroup.categoryGroups.filter(
        (group) => String(group.categoryId) !== categoryId
      );
      await categoryGroup.save();
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

router.delete("/delete/each/question/:questionId", async (req, res) => {
  try {
    const questionId = req.params.questionId;

    // Delete from Qna collection
    await QNA.findByIdAndDelete(questionId);

    // Delete from Category collection
    await Category.updateMany(
      { "categories.questionId": questionId },
      { $pull: { categories: { questionId: questionId } } }
    );

    // Delete from SubCategory collection
    await SubCategory.updateMany(
      { "questions.questionId": questionId },
      { $pull: { questions: { questionId: questionId } } }
    );

    res.status(200).json({
      message:
        "Question and associated records in Categories and Subcategories deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting question:", error);
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
      jsonData.map(async ({ prompt, questiontext, questionimage, answers }) => {
        const existingQuestion = await QNA.findOne({ questiontext });

        if (existingQuestion) {
          // If questiontext already exists, return an error response
          return {
            error: `Question with text '${questiontext}' already exists.`,
          };
        }

        // Create a new question with questionimage
        const savedQuestion = await QNA.create({
          prompt,
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
        $set: questionData,
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
    const { prompt, code, header, description, image } = req.body;

    const newTopic = await Topic.create({
      prompt: prompt,
      topicCode: code,
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
      prompt: req.body.prompt,
      topicCode: req.body.code,
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

router.get("/get/first/topic/:topicCodes", async (req, res) => {
  let { topicCodes } = req.params;

  // Parse the JSON string into an array
  topicCodes = JSON.parse(topicCodes);

  // Remove any non-alphanumeric characters and spaces from each topic code
  topicCodes = topicCodes.map((topicCode) => topicCode.replace(/\W+/g, " "));

  try {
    const topics = [];
    const uniqueTopicCodes = new Set();

    // Iterate over each topic code and fetch data for each code
    for (const topicCode of topicCodes) {
      // Skip duplicate topic codes
      if (uniqueTopicCodes.has(topicCode)) {
        console.log(`Duplicate topic code skipped: ${topicCode}`);
        continue;
      }

      const topic = await Topic.findOne({ topicCode });

      if (!topic) {
        console.log(`Topic with code ${topicCode} not found`);
        continue; // Continue to the next iteration if topic is not found
      }

      topics.push(topic);
      uniqueTopicCodes.add(topicCode);
    }

    if (topics.length === 0) {
      return res.status(404).json({ error: "No topics found" });
    }

    res.json({ topics });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get/aggregatedResults/:username", async (req, res) => {
  try {
    const { username } = req.params;

    // Find the document with the specified username
    const result = await UserResult.findOne({ username });

    if (!result) {
      return res.status(404).json({ error: "Username not found" });
    }

    // Create an array to store the structured data
    const structuredData = [];

    // Iterate through user results to extract and organize aggregated results
    result.userresults.forEach(({ categoryId, aggregatedResults }) => {
      // Create an object for each category ID and its aggregated results
      const categoryData = {
        categoryId: categoryId.toString(),
        aggregatedResults: aggregatedResults,
      };

      // Push the category data to the structured array
      structuredData.push(categoryData);
    });

    res.json(structuredData);
  } catch (error) {
    console.error("Error fetching aggregated results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
