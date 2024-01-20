const express = require("express");
const router = express.Router();
const QuestionAnswer = require("../models/QuestionAnswer");
const ResultModel = require("../models/Result");
const CategoryGroup = require("../models/CategoryGroup");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const QNA = require("../models/QNA");

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

    console.log("Aggregated Results:", aggregatedResults);

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

router.get("/get/first/categorygroup", async (req, res) => {
  try {
    const categoryGroup = await CategoryGroup.findOne(
      {},
      {
        categoryGroupHeading: 1,
        categoryGroupDescription: 1,
        categoryGroupImage: 1,
        categoryGroups: 1, // Retrieve only the first item from the array
      }
    );

    console.log("categoryGroup", categoryGroup);

    if (!categoryGroup) {
      return res.status(404).json({ error: "CategoryGroup not found" });
    }

    res.status(200).json({ categoryGroup });
  } catch (error) {
    console.error("Error retrieving categories from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
