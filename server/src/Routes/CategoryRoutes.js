const express = require("express");
const router = express.Router();

const CategoryGroup = require("../Models/CategoryGroup");
const Category = require("../Models/Category");
const SubCategory = require("../Models/SubCategory");
const QNA = require("../Models/QNA");
const UserResult = require("../Models/UserResult");

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
    const { username, userresults } = req.body;

    // Find the existing user result
    let existingUserResult = await UserResult.findOne({ username });

    if (existingUserResult) {
      // Update existing user results if categoryId, questionId, and answerId already exist
      userresults.forEach(({ categoryId, questions }) => {
        const existingCategory = existingUserResult.userresults.find(
          (userResult) => userResult.categoryId.toString() === categoryId
        );

        if (existingCategory) {
          questions.forEach(({ questionId, answerId, results }) => {
            const existingQuestionIndex = existingCategory.questions.findIndex(
              (question) => question.questionId.toString() === questionId
            );

            if (existingQuestionIndex !== -1) {
              // Update existing question's results
              existingCategory.questions[existingQuestionIndex].results =
                results;
            } else {
              // Push new question
              existingCategory.questions.push({
                questionId,
                answerId,
                results,
              });
            }
          });

          // Recalculate aggregated results for the category
          existingCategory.aggregatedResults = calculateAggregatedResults(
            existingCategory.questions
          );
        } else {
          // Push new category with all questions and aggregated results
          existingUserResult.userresults.push({
            categoryId,
            questions,
            aggregatedResults: calculateAggregatedResults(questions),
          });
        }
      });

      // Recalculate aggregated results for the entire user
      existingUserResult.userresults.forEach((userResult) => {
        userResult.aggregatedResults = calculateAggregatedResults(
          userResult.questions
        );
      });

      await existingUserResult.save();
      res.status(200).json({ message: "User results updated successfully." });
    } else {
      // If no existing user result found, create a new one
      const newUserResult = new UserResult({
        username,
        userresults: userresults.map(({ categoryId, questions }) => ({
          categoryId,
          questions,
          aggregatedResults: calculateAggregatedResults(questions),
        })),
      });

      await newUserResult.save();
      res.status(200).json({ message: "New user results saved successfully." });
    }
  } catch (error) {
    console.error("Error saving user results:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Function to calculate aggregated results for a set of questions
function calculateAggregatedResults(questions) {
  const aggregatedResults = {};

  questions.forEach(({ results }) => {
    results.forEach(({ result, value }) => {
      if (!aggregatedResults[result]) {
        aggregatedResults[result] = 0;
      }
      aggregatedResults[result] += value;
    });
  });

  // Transform aggregatedResults into an array of objects
  return Object.keys(aggregatedResults).map((resultName) => ({
    resultName,
    totalScore: [...aggregatedResults[resultName].toString()].reduce(
      (acc, digit) => acc + parseInt(digit),
      0
    ),
  }));
}

module.exports = router;
