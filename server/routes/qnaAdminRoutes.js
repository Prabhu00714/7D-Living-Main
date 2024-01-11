const express = require("express");
const QuestionAnswer = require("../models/QuestionAnswer");

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
    const { categoryId, category, questions } = req.body;
    console.log("categoryId", categoryId);

    // Check if the category exists
    const existingCategory = await QuestionAnswer.findById(categoryId);
    console.log("existingCategory", existingCategory);

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Update the category fields
    existingCategory.category = category;

    // Update or append questions based on questionid
    questions.forEach((newQuestion) => {
      const existingQuestion = existingCategory.questions.find(
        (q) => q.questionid === newQuestion.questionid
      );

      if (existingQuestion) {
        // Update existing question
        existingQuestion.questionnumber = newQuestion.questionnumber;
        existingQuestion.questiontext = newQuestion.questiontext;
        existingQuestion.answers = newQuestion.answers;
        existingQuestion.image = newQuestion.image;
      } else {
        // Append new question
        existingCategory.questions.push(newQuestion);
      }
    });

    // Save the updated category
    const updatedCategory = await existingCategory.save();

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
