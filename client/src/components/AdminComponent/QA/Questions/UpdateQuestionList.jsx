import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Box, Typography, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ToastContainer, toast } from "react-toastify";

const UpdateQuestionList = ({ state, questions, setQuestions }) => {
  const fileInputRef = useRef(null);

  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    if (state.selectedQuestionItem) {
      axios
        .get(
          `http://localhost:3001/api/qna/get/each/question/${state.selectedQuestionItem._id}`
        )
        .then((response) => {
          const { answers, questiontext, _id } = response.data;

          // Convert the nested results array within answers
          const updatedAnswers = answers.map((answer) => ({
            answer: answer.answer,
            answerimage: answer.answerimage || "", // Add default value
            results: answer.results.map((result) => ({
              result: result.result,
              value: result.value,
            })),
          }));

          const updatedQuestions = [
            {
              questiontext,
              answers: updatedAnswers,
              questionimage: "", // Update with your actual questionimage property
            },
          ];

          setQuestions(updatedQuestions);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        });
    }
  }, [state.selectedQuestionItem]);

  const handleChange = (field, value, qIndex, aIndex, rIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      if (aIndex === undefined && rIndex === undefined) {
        updatedQuestions[qIndex][field] = value;
      } else if (rIndex === undefined) {
        updatedQuestions[qIndex].answers[aIndex][field] = value;
      } else {
        updatedQuestions[qIndex].answers[aIndex].results[rIndex][field] = value;
      }
      return updatedQuestions;
    });
  };

  const handleAddAnswer = (qIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[qIndex].answers.push({
        answer: "",
        answerimage: "",
        results: [{ result: "", value: "" }],
      });
      return updatedQuestions;
    });
  };

  const handleDeleteAnswer = (qIndex, aIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[qIndex].answers.splice(aIndex, 1);
      return updatedQuestions;
    });
  };

  const handleAddResult = (qIndex, aIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[qIndex].answers[aIndex].results.push({
        result: "",
        value: "",
      });
      return updatedQuestions;
    });
  };

  const handleDeleteResult = (qIndex, aIndex, rIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[qIndex].answers[aIndex].results.splice(rIndex, 1);
      return updatedQuestions;
    });
  };

  const handleImageUpload = (qIndex, aIndex, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQuestions((prevQuestions) => {
          const updatedQuestions = [...prevQuestions];
          if (aIndex === undefined) {
            // Question image
            updatedQuestions[qIndex].questionimage = reader.result;
          } else {
            // Answer image
            updatedQuestions[qIndex].answers[aIndex].answerimage =
              reader.result;
          }
          return updatedQuestions;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Box>
        {/* Question Section */}
        {questions.map((question, qIndex) => (
          <div key={qIndex}>
            {/* Question Text Input */}
            <Typography variant="subtitle1">Question Text:</Typography>
            <TextField
              type="text"
              value={question.questiontext}
              onChange={(e) =>
                handleChange("questiontext", e.target.value, qIndex)
              }
              size="small"
              fullWidth
              margin="dense"
            />

            {/* Add Answer Button */}
            <Button
              variant="outlined"
              onClick={() => handleAddAnswer(qIndex)}
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
                    handleChange("answer", e.target.value, qIndex, aIndex)
                  }
                  size="small"
                  fullWidth
                  margin="dense"
                />

                {/* Image Upload Input for Answer */}
                <Typography variant="subtitle1">Answer Image:</Typography>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(qIndex, aIndex, e)}
                />

                {/* Delete Answer Button */}
                <Button
                  variant="outlined"
                  onClick={() => handleDeleteAnswer(qIndex, aIndex)}
                  sx={{ mt: 1, mb: 2 }}
                >
                  Delete Answer
                </Button>

                {/* Add Result Button */}
                <Button
                  variant="outlined"
                  onClick={() => handleAddResult(qIndex, aIndex)}
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
                        handleChange(
                          "result",
                          e.target.value,
                          qIndex,
                          aIndex,
                          rIndex
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
                        handleChange(
                          "value",
                          e.target.value,
                          qIndex,
                          aIndex,
                          rIndex
                        )
                      }
                      size="small"
                      fullWidth
                      margin="dense"
                    />

                    {/* Delete Result Button */}
                    <Button
                      variant="outlined"
                      onClick={() => handleDeleteResult(qIndex, aIndex, rIndex)}
                      sx={{ mt: 1, mb: 2 }}
                    >
                      Delete Result
                    </Button>
                  </div>
                ))}
              </div>
            ))}

            {/* Image Upload Input for Question */}
            <Typography variant="subtitle1">Question Image:</Typography>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(qIndex, undefined, e)}
            />
          </div>
        ))}
        <ToastContainer
          position={isMobile ? "top-center" : "top-right"}
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

export default UpdateQuestionList;
