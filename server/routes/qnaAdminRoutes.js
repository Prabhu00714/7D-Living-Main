const express = require("express");
const QuestionAnswer = require("../models/QuestionAnswer");

const router = express.Router();

router.post("/upload", async (req, res) => {
  try {
    const jsonData = req.body;

    console.log(jsonData);

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

    console.log(JSON.stringify(result, null, 2));

    res.json(result);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
