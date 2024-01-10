// QuestionAnswer.js

import React, { useState, useEffect } from "react";
import { Paper, Typography, Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import ConfirmationDialog from "./ConfirmationDialog"; // Import your ConfirmationDialog component
import { useAuth } from "../../AuthContext";

const QuestionAnswer = ({ data, fetchData }) => {
  // console.log("frontend data", data);
  const { user } = useAuth();
  const [subSelectedOptions, setSubSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleSubOptionSelect = (questionIndex, answerIndex, value) => {
    setSubSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionIndex]: { answerIndex, value },
    }));
  };

  const handleOpenConfirmationDialog = () => {
    if (!isSubmitButtonDisabled) {
      setConfirmationDialogOpen(true);
    }
  };

  const handleConfirm = async () => {
    const result = {
      username: user.username,
      categoryid: data._id,
      questions: data.questions.map((question) => ({
        questionid: mongoose.Types.ObjectId(question._id),
        answers: question.answers.map((answer) => ({
          answer: answer.answer,
          results: answer.results.map((result) => ({
            result: result.result,
            value: result.value,
          })),
        })),
      })),
    };
    console.log("result", result);

    try {
      // Make a POST request to your backend API
      const response = await fetch(
        "http://localhost:3001/api/category/post/saveResult",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(result),
        }
      );

      if (response.ok) {
        console.log("Data submitted successfully!");
      } else {
        console.error("Failed to submit data to server");
      }
    } catch (error) {
      console.error("Error submitting data to server", error);
    }
    setScore(/* calculate the score based on the result */);
    setSubmitButtonDisabled(true);

    // Reset states
    setSubSelectedOptions({});
    setScore(0);

    // Close the confirmation dialog
    setConfirmationDialogOpen(false);
  };

  const handleCancel = () => {
    setConfirmationDialogOpen(false);
  };

  useEffect(() => {
    const areAllOptionsSelected =
      Object.keys(subSelectedOptions).length === data.questions.length;

    setSubmitButtonDisabled(!areAllOptionsSelected);
  }, [subSelectedOptions, data.questions]);

  useEffect(() => {
    setSubSelectedOptions({});
    setScore(0);
  }, [fetchData]);

  if (!data || !data.questions) {
    console.log("Data is missing properties");
    return <div>No data available</div>;
  }

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          color: "black",
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        {data.category}
      </Typography>

      {data.questions.map((question, questionIndex) => (
        <Paper
          key={questionIndex}
          sx={{
            padding: "16px",
            marginBottom: "16px",
            maxWidth: "1000px",
            minWidth: "800px",
            width: "100%",
          }}
          elevation={24}
        >
          <div key={questionIndex} style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <Typography
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {questionIndex + 1}. {question.questiontext}
              </Typography>
              &nbsp;
              {question.answers &&
                question.answers.map((answer, answerIndex) => (
                  <div key={answerIndex}>
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: "14px",
                      }}
                    >
                      <input
                        type="radio"
                        name={`sub-${questionIndex}`}
                        onChange={() =>
                          handleSubOptionSelect(
                            questionIndex,
                            answerIndex,
                            answer.results[0].value
                          )
                        }
                        checked={
                          subSelectedOptions[questionIndex]?.answerIndex ===
                          answerIndex
                        }
                      />
                      &nbsp;&nbsp;&nbsp;{answer.answer}
                    </Typography>
                  </div>
                ))}
            </div>
            <div>
              {question.image && (
                <img
                  width={120}
                  height={120}
                  src={question.image}
                  alt={`Image for question ${questionIndex + 1}`}
                />
              )}
            </div>
          </div>
        </Paper>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenConfirmationDialog}
        disabled={isSubmitButtonDisabled}
      >
        Submit
      </Button>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Score: {score}
      </Typography>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={isConfirmationDialogOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />
    </Box>
  );
};

export default QuestionAnswer;
