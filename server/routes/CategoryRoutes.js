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
  const data = req.body;

  console.log("bckend data", data);

  try {
    // Check if the username table exists
    const existingUser = await ResultModel.findOne({ username: data.username });

    if (!existingUser) {
      // If the username table doesn't exist, create a new one
      const newUser = new ResultModel({
        username: data.username,
        categories: [{ category: data.category, questions: data.questions }],
      });

      await newUser.save();
      console.log("New user table created and data saved successfully!");
      res
        .status(201)
        .send("New user table created and data saved successfully!");
    } else {
      // If the username table exists, check if the category already exists
      const existingCategory = existingUser.categories.find(
        (cat) => cat.category === data.category
      );

      if (existingCategory) {
        console.log("Category already exists for the given username");
        res.status(409).send("Category already exists for the given username");
      } else {
        // If the category doesn't exist, append it to the existing user table
        existingUser.categories.push({
          category: data.category,
          questions: data.questions,
        });
        await existingUser.save();

        console.log("Data appended to existing user table successfully!");
        res
          .status(200)
          .send("Data appended to existing user table successfully!");
      }
    }
  } catch (error) {
    console.error("Error saving data to MongoDB", error);
    res.status(500).send("Error saving data to MongoDB");
  }
});

module.exports = router;
