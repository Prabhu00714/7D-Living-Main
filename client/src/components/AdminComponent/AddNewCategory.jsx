/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import axios from "axios";
import { Box, Typography, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ToastContainer, toast } from "react-toastify";

const AddNewCategory = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const containerStyle = {
    marginLeft: isMobile ? 0 : 400,
    transition: "margin 0.5s",
    position: "absolute",
    top: 80,
  };

  const initialCategory = {
    category: "",
    questions: [
      {
        questionnumber: 1,
        questiontext: "",
        answers: [
          {
            answer: "",
            results: [{ result: "", value: "" }],
          },
        ],
        image: "",
      },
    ],
  };

  const [categories, setCategories] = useState([initialCategory]);
  const fileInputRef = useRef(null); // Create a ref for file input

  const addQuestion = (cIndex) => {
    const updatedCategories = [...categories];
    const newQuestionNumber = updatedCategories[cIndex].questions.length + 1;
    updatedCategories[cIndex].questions.push({
      questionnumber: newQuestionNumber,
      questiontext: "",
      answers: [{ answer: "", results: [{ result: "", value: "" }] }],
      image: "",
    });
    setCategories(updatedCategories);
  };

  const deleteQuestion = (cIndex, qIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[cIndex].questions.splice(qIndex, 1);
    setCategories(updatedCategories);
  };

  const updateCategory = (cIndex, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[cIndex][field] = value;
    setCategories(updatedCategories);
  };

  const updateQuestion = (cIndex, qIndex, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[cIndex].questions[qIndex][field] = value;
    setCategories(updatedCategories);
  };

  const addAnswer = (cIndex, qIndex) => {
    const updatedCategories = [...categories];
    const newAnswerId =
      updatedCategories[cIndex].questions[qIndex].answers.length + 1;
    updatedCategories[cIndex].questions[qIndex].answers.push({
      answer: "",
      results: [{ result: "", value: "" }],
    });
    setCategories(updatedCategories);
  };

  const deleteAnswer = (cIndex, qIndex, aIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[cIndex].questions[qIndex].answers.splice(aIndex, 1);
    setCategories(updatedCategories);
  };

  const updateAnswer = (cIndex, qIndex, aIndex, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[cIndex].questions[qIndex].answers[aIndex][field] = value;
    setCategories(updatedCategories);
  };

  const addResult = (cIndex, qIndex, aIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[cIndex].questions[qIndex].answers[aIndex].results.push({
      result: "",
      value: "",
    });
    setCategories(updatedCategories);
  };

  const updateResult = (cIndex, qIndex, aIndex, rIndex, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[cIndex].questions[qIndex].answers[aIndex].results[rIndex][
      field
    ] = value;
    setCategories(updatedCategories);
  };

  const deleteResult = (cIndex, qIndex, aIndex, rIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[cIndex].questions[qIndex].answers[aIndex].results.splice(
      rIndex,
      1
    );
    setCategories(updatedCategories);
  };

  const handleImageUpload = (cIndex, qIndex, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedCategories = [...categories];
        updatedCategories[cIndex].questions[qIndex].image = reader.result;
        setCategories(updatedCategories);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setCategories([initialCategory]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const generateJson = async () => {
    try {
      // Validate if any category or question has empty fields
      const isInvalidData = categories.some(
        (category) =>
          !category.category.trim() ||
          category.questions.some(
            (question) =>
              !question.questiontext.trim() ||
              !question.answers.every(
                (answer) =>
                  !!answer.answer.trim() &&
                  answer.results.every(
                    (result) => !!result.result.trim() && !!result.value.trim()
                  )
              )
          )
      );

      if (isInvalidData) {
        toast.error("Please fill in all fields.");
        return;
      }

      const jsonData = categories.map((category) => ({
        category: category.category,
        questions: category.questions.map((question) => ({
          questionnumber: question.questionnumber,
          questiontext: question.questiontext,
          answers: question.answers.map((answer) => ({
            answer: answer.answer,
            results: answer.results,
          })),
          image: question.image,
        })),
      }));

      // Send the JSON data to the backend endpoint
      await axios.post(
        "http://localhost:3001/api/qna/post/each/category/qna",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Data added successfully!");
    } catch (error) {
      console.error("Error sending data to the backend:", error);
      toast.error("Failed to add data!");
    }
    resetForm();
  };

  return (
    <div style={containerStyle}>
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: "auto" }}>
        {categories.map((category, cIndex) => (
          <div key={cIndex}>
            {/* Category Input */}
            <Typography variant="h6">Category:</Typography>
            <TextField
              type="text"
              value={category.category}
              onChange={(e) =>
                updateCategory(cIndex, "category", e.target.value)
              }
              size="small"
              fullWidth
              margin="dense"
            />

            {/* Question Section */}
            {category.questions.map((question, qIndex) => (
              <div key={qIndex}>
                {/* Question ID Input */}
                <Typography variant="subtitle1">Question ID:</Typography>
                <TextField
                  type="number"
                  value={question.questionnumber}
                  onChange={(e) =>
                    updateQuestion(
                      cIndex,
                      qIndex,
                      "questionnumber",
                      e.target.value
                    )
                  }
                  size="small"
                  fullWidth
                  margin="dense"
                />

                {/* Question Text Input */}
                <Typography variant="subtitle1">Question Text:</Typography>
                <TextField
                  type="text"
                  value={question.questiontext}
                  onChange={(e) =>
                    updateQuestion(
                      cIndex,
                      qIndex,
                      "questiontext",
                      e.target.value
                    )
                  }
                  size="small"
                  fullWidth
                  margin="dense"
                />

                {/* Delete Question Button */}
                <Button
                  variant="outlined"
                  onClick={() => deleteQuestion(cIndex, qIndex)}
                  sx={{ mt: 1, mb: 2 }}
                >
                  Delete Question
                </Button>

                {/* Image Upload Input */}
                <Typography variant="subtitle1">Image:</Typography>
                <input
                  ref={fileInputRef} // Set the ref for file input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(cIndex, qIndex, e)}
                />

                {/* Add Answer Button */}
                <Button
                  variant="outlined"
                  onClick={() => addAnswer(cIndex, qIndex)}
                  sx={{ mt: 1, mb: 2 }}
                >
                  Add Answer
                </Button>

                {/* Answer Section */}
                {question.answers.map((answer, aIndex) => (
                  <div key={aIndex}>
                    {/* Answer Input */}
                    <Typography variant="subtitle1">Answer:</Typography>
                    <TextField
                      type="text"
                      value={answer.answer}
                      onChange={(e) =>
                        updateAnswer(
                          cIndex,
                          qIndex,
                          aIndex,
                          "answer",
                          e.target.value
                        )
                      }
                      size="small"
                      fullWidth
                      margin="dense"
                    />

                    {/* Delete Answer Button */}
                    <Button
                      variant="outlined"
                      onClick={() => deleteAnswer(cIndex, qIndex, aIndex)}
                      sx={{ mt: 1, mb: 2 }}
                    >
                      Delete Answer
                    </Button>

                    {/* Add Result Button */}
                    <Button
                      variant="outlined"
                      onClick={() => addResult(cIndex, qIndex, aIndex)}
                      sx={{ mt: 1, mb: 2, ml: 2 }}
                    >
                      Add Result
                    </Button>

                    {/* Result Section */}
                    {answer.results.map((result, rIndex) => (
                      <div key={rIndex}>
                        {/* Result Input */}
                        <Typography variant="subtitle1">Result:</Typography>
                        <TextField
                          type="text"
                          value={result.result}
                          onChange={(e) =>
                            updateResult(
                              cIndex,
                              qIndex,
                              aIndex,
                              rIndex,
                              "result",
                              e.target.value
                            )
                          }
                          size="small"
                          fullWidth
                          margin="dense"
                        />

                        {/* Value Input */}
                        <Typography variant="subtitle1">Value:</Typography>
                        <TextField
                          type="text"
                          value={result.value}
                          onChange={(e) =>
                            updateResult(
                              cIndex,
                              qIndex,
                              aIndex,
                              rIndex,
                              "value",
                              e.target.value
                            )
                          }
                          size="small"
                          fullWidth
                          margin="dense"
                        />

                        {/* Delete Result Button */}
                        <Button
                          variant="outlined"
                          onClick={() =>
                            deleteResult(cIndex, qIndex, aIndex, rIndex)
                          }
                          sx={{ mt: 1, mb: 2 }}
                        >
                          Delete Result
                        </Button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}

            {/* Add Question Button */}
            <Button
              variant="outlined"
              onClick={() => addQuestion(cIndex)}
              sx={{ mt: 1, mb: 2 }}
            >
              Add Question
            </Button>
          </div>
        ))}

        {/* Generate JSON Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={generateJson}
          sx={{ mt: 2 }}
        >
          Generate JSON
        </Button>
        <ToastContainer
          position={isMobile ? "bottom-center" : "top-right"}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Box>
    </div>
  );
};

export default AddNewCategory;
