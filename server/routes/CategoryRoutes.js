const express = require("express");
const router = express.Router();
const QuestionAnswer = require("../models/QuestionAnswer");
const ResultModel = require("../models/Result");

router.get("/get/each/Categories", async (req, res) => {
  try {
    const categoriesWithIds = await QuestionAnswer.find({}, "_id category");
    console.log("Categories retrieved from MongoDB:", categoriesWithIds);
    res.status(200).json({ categories: categoriesWithIds });
  } catch (error) {
    console.error("Error retrieving categories from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/get/each/qna", async (req, res) => {
  try {
    const queryString = req.body.queryString;
    console.log("Received string from frontend:", queryString);

    // Query MongoDB to find documents with the specified category
    const result = await QuestionAnswer.find({
      category: new RegExp(`^${queryString}$`, "i"),
    }).lean();

    console.log("Data fetched from MongoDB:", result);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error processing string:", error);
    res.status(500).json({ error: "Error processing string" });
  }
});

router.post("/post/saveResult", async (req, res) => {
  try {
    const jsonData = req.body;

    console.log(jsonData);

    const categories = {
      categoryid: jsonData.categoryid,
      questions: jsonData.questions.map(({ questionid, answers }) => ({
        questionid,
        answers: answers.map(({ answer, results }) => ({
          answer,
          results,
        })),
      })),
    };

    const savedData = await ResultModel.create(categories);

    res.json(savedData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
