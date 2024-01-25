const express = require("express");
const router = express.Router();
const QuestionAnswer = require("../models/QuestionAnswer");
const ResultModel = require("../models/Result");
const CategoryGroup = require("../models/CategoryGroup");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const QNA = require("../models/QNA");
const UserResult = require("../models/UserResult");

router.get("/get/each/Categories", async (req, res) => {
  try {
    const categoriesWithIds = await QuestionAnswer.find({}, "_id category");
    res.status(200).json({ categories: categoriesWithIds });
  } catch (error) {
    console.error("Error retrieving categories from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/get/each/qna", async (req, res) => {
  try {
    const queryString = req.body.queryString;

    // Query MongoDB to find documents with the specified category
    const result = await QuestionAnswer.find({
      category: new RegExp(`^${queryString}$`, "i"),
    }).lean();

    res.status(200).json(result);
  } catch (error) {
    console.error("Error processing string:", error);
    res.status(500).json({ error: "Error processing string" });
  }
});

router.post("/post/saveResult", async (req, res) => {
  try {
    const jsonData = req.body;

    // Calculate aggregated results
    const aggregatedResults = {};

    jsonData.questions.forEach(({ results }) => {
      results.forEach(({ result, value }) => {
        if (!aggregatedResults[result]) {
          aggregatedResults[result] = 0;
        }
        aggregatedResults[result] += value;
      });
    });
    // Transform aggregatedResults into an array of objects
    const aggregatedResultsArray = Object.keys(aggregatedResults).map(
      (resultName) => ({
        resultName,
        totalScore: [...aggregatedResults[resultName].toString()].reduce(
          (acc, digit) => acc + parseInt(digit),
          0
        ),
      })
    );

    // Create a new document with aggregatedResults at the top level
    const newDocument = {
      username: jsonData.username,
      categoryid: jsonData.categoryid,
      questions: jsonData.questions.map(
        ({ questionid, answerid, results }) => ({
          questionid,
          answerid,
          results,
        })
      ),
      aggregatedResults: aggregatedResultsArray,
    };

    // Create or update the document in the database
    const savedData = await ResultModel.findOneAndUpdate(
      { categoryid: jsonData.categoryid },
      newDocument,
      { upsert: true, new: true }
    );

    // Return the saved document with aggregatedResultsArray
    res.json({ savedData, aggregatedResultsArray });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// new structure

router.get("/get/first/categorygroup/:categorygroup", async (req, res) => {
  const { categorygroup } = req.params;
  try {
    const index = parseInt(categorygroup) - 1;

    const categoryGroup = await CategoryGroup.findOne({}).skip(index).limit(1);

    if (!categoryGroup) {
      return res.status(404).json({ error: "Category group not found" });
    }

    res.status(200).json(categoryGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/first/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  console.log("categoryId", categoryId);

  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/first/subcategory/:subcategoryId", async (req, res) => {
  const { subcategoryId } = req.params;
  try {
    const subCategory = await SubCategory.findById(subcategoryId);

    if (!subCategory) {
      return res.status(404).json({ error: "sub category not found" });
    }
    res.status(200).json(subCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/first/questions/:questionIds", async (req, res) => {
  const questionIds = req.params.questionIds.split(",");
  try {
    const result = await Promise.all(
      questionIds.map(async (questionId) => {
        const questionData = await QNA.findById(questionId);
        return questionData;
      })
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get/categorygroup/length", async (req, res) => {
  try {
    const categoryGroupLength = await CategoryGroup.countDocuments();

    res.json({ length: categoryGroupLength });
  } catch (error) {
    console.error("Error fetching category groups length:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/post/user/result", async (req, res) => {
  try {
    const { username, result } = req.body;

    // Calculate aggregated results
    const aggregatedResults = {};

    result.forEach(({ results }) => {
      results.forEach(({ result, value }) => {
        if (!aggregatedResults[result]) {
          aggregatedResults[result] = 0;
        }
        aggregatedResults[result] += value;
      });
    });

    // Transform aggregatedResults into an array of objects
    const aggregatedResultsArray = Object.keys(aggregatedResults).map(
      (resultName) => ({
        resultName,
        totalScore: [...aggregatedResults[resultName].toString()].reduce(
          (acc, digit) => acc + parseInt(digit),
          0
        ),
      })
    );

    // Find the existing user result
    const existingUserResult = await UserResult.findOne({ username });

    if (existingUserResult) {
      // If the user already exists, append the new results and aggregated results
      existingUserResult.userresults.push(...result);
      existingUserResult.aggregatedResults.push(...aggregatedResultsArray);
      await existingUserResult.save();
      res.status(200).json({ message: "User results updated successfully." });
    } else {
      // If the user doesn't exist, create a new user
      const newUserResult = new UserResult({
        username,
        userresults: result,
        aggregatedResults: aggregatedResultsArray,
      });
      await newUserResult.save();
      res.status(200).json({ message: "User results saved successfully." });
    }
  } catch (error) {
    console.error("Error saving user results:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
