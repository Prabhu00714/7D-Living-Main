/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ToastContainer, toast } from "react-toastify";

const AddQuestionsList = ({ state, dispatch, fileInputRef }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const updatePrompt = (qIndex, value) => {
    const updatedQuestions = [...state.questions];
    updatedQuestions[qIndex].prompt = value;
    dispatch({ type: "set_questions", payload: updatedQuestions });
  };

  const addAnswer = (qIndex) => {
    const updatedQuestions = [...state.questions];
    const newAnswerId = updatedQuestions[qIndex].answers.length + 1;
    updatedQuestions[qIndex].answers.push({
      answer: "",
      answerimage: "",
      results: [{ result: "", value: "" }],
    });
    dispatch({ type: "set_questions", payload: updatedQuestions });
  };

  const deleteAnswer = (qIndex, aIndex) => {
    const updatedQuestions = [...state.questions];
    updatedQuestions[qIndex].answers.splice(aIndex, 1);
    dispatch({ type: "set_questions", payload: updatedQuestions });
  };

  const addResult = (qIndex, aIndex) => {
    const updatedQuestions = [...state.questions];
    updatedQuestions[qIndex].answers[aIndex].results.push({
      result: "",
      value: "",
    });
    dispatch({ type: "set_questions", payload: updatedQuestions });
  };

  const deleteResult = (qIndex, aIndex, rIndex) => {
    const updatedQuestions = [...state.questions];
    updatedQuestions[qIndex].answers[aIndex].results.splice(rIndex, 1);
    dispatch({ type: "set_questions", payload: updatedQuestions });
  };

  const handleImageUpload = (qIndex, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedQuestions = [...state.questions];
        updatedQuestions[qIndex].questionimage = reader.result;
        dispatch({ type: "set_questions", payload: updatedQuestions });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateQuestion = (qIndex, field, value) => {
    const updatedQuestions = [...state.questions];
    updatedQuestions[qIndex][field] = value;
    dispatch({ type: "set_questions", payload: updatedQuestions });
  };

  const updateAnswer = (qIndex, aIndex, field, value) => {
    const updatedQuestions = [...state.questions];
    updatedQuestions[qIndex].answers[aIndex][field] = value;
    dispatch({ type: "set_questions", payload: updatedQuestions });
  };

  const handleAnswerImageUpload = (qIndex, aIndex, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedQuestions = [...state.questions];
        updatedQuestions[qIndex].answers[aIndex].answerimage = reader.result;
        dispatch({ type: "set_questions", payload: updatedQuestions });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateResult = (qIndex, aIndex, rIndex, field, value) => {
    const updatedQuestions = [...state.questions];
    updatedQuestions[qIndex].answers[aIndex].results[rIndex][field] = value;
    dispatch({ type: "set_questions", payload: updatedQuestions });
  };

  return (
    <div>
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: "auto" }}>
        {state.questions.map((question, qIndex) => (
          <div key={qIndex}>
            {/* Prompt Input */}
            <Typography variant="subtitle1">Prompt:</Typography>
            <TextField
              type="text"
              value={question.prompt}
              onChange={(e) => updatePrompt(qIndex, e.target.value)}
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
                updateQuestion(qIndex, "questiontext", e.target.value)
              }
              size="small"
              fullWidth
              margin="dense"
            />

            {/* Image Upload Input */}
            <Typography variant="subtitle1">Question Image:</Typography>
            <input
              ref={fileInputRef} // Set the ref for questionImage input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(qIndex, e)}
            />

            {/* Add Answer Button */}
            <Button
              variant="outlined"
              onClick={() => addAnswer(qIndex)}
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
                    updateAnswer(qIndex, aIndex, "answer", e.target.value)
                  }
                  size="small"
                  fullWidth
                  margin="dense"
                />

                {/* Answer Image Upload Input */}
                <Typography variant="subtitle1">Answer Image:</Typography>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleAnswerImageUpload(qIndex, aIndex, e)}
                />

                {/* Delete Answer Button */}
                <Button
                  variant="outlined"
                  onClick={() => deleteAnswer(qIndex, aIndex)}
                  sx={{ mt: 1, mb: 2 }}
                >
                  Delete Answer
                </Button>

                {/* Add Result Button */}
                <Button
                  variant="outlined"
                  onClick={() => addResult(qIndex, aIndex)}
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
                      onClick={() => deleteResult(qIndex, aIndex, rIndex)}
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

export default AddQuestionsList;
