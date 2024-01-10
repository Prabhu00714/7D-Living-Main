const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 3001;

mongoose.connect("mongodb://localhost:27017/store", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const QuestionAnswer = mongoose.model(
  "QuestionAnswer",
  new mongoose.Schema({}, { strict: false })
);

app.use(bodyParser.json({ limit: "50mb" }));

app.post("/api/submitSurvey", async (req, res) => {
  try {
    const jsonData = req.body;

    console.log("json data", jsonData);

    const categories = jsonData.map(({ category, questions }) => ({
      category,
      questions: questions.map(
        ({ questionid, questiontext, answers, image }) => ({
          questionid,
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

app.get("/api/fetchData", async (req, res) => {
  try {
    // Query MongoDB to retrieve all data from DynamicData collection
    const result = await QuestionAnswer.find({});

    // Log the retrieved data
    console.log(JSON.stringify(result, null, 2));

    // Send the data as JSON response
    res.json(result);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/getCategories", async (req, res) => {
  try {
    const categories = await QuestionAnswer.distinct("data.category");
    console.log("Categories retrieved from MongoDB:", categories);
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error retrieving categories from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/fetchDataFromMongo", async (req, res) => {
  try {
    const queryString = req.body.queryString;
    console.log("Received string from frontend:", queryString);

    // Replace "YourModel" with your actual mongoose model and schema
    const result = await QuestionAnswer.find({
      data: { $elemMatch: { category: new RegExp(`^${queryString}$`, "i") } },
    }).lean();

    console.log("Data fetched from MongoDB:", result);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error processing string:", error);
    res.status(500).json({ error: "Error processing string" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
