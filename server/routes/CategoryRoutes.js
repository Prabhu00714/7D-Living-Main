const express = require("express");
const router = express.Router();
const QuestionAnswer = require("../models/QuestionAnswer");

router.get("/get/each/Categories", async (req, res) => {
  try {
    const categories = await QuestionAnswer.distinct("category");
    console.log("Categories retrieved from MongoDB:", categories);
    res.status(200).json({ categories });
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

module.exports = router;
