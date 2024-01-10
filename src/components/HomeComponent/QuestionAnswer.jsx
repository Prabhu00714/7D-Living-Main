// components/QuestionAnswer.js
import React, { useState, useEffect } from "react";
import { Paper, Typography, Box, Button } from "@mui/material";

const QuestionAnswer = ({ data, fetchData }) => {
  const [subSelectedOptions, setSubSelectedOptions] = useState({});
  const [score, setScore] = useState(0);

  const handleSubOptionSelect = (questionIndex, answerIndex, value) => {
    setSubSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionIndex]: { answerIndex, value },
    }));
  };

  const handleSubmit = () => {
    let totalScore = 0;
    for (const questionIndex in subSelectedOptions) {
      const answerIndex = subSelectedOptions[questionIndex].answerIndex;
      const value = subSelectedOptions[questionIndex].value;
      totalScore += parseInt(value);
    }

    setScore(totalScore);

    // Adjust this part based on your actual data structure
    const result = {
      category: data.category,
      questions: data.questions.map((question) => ({
        questionid: question.questionid,
        questiontext: question.questiontext,
        answers: question.answers.map((answer) => ({
          answer: answer.answer,
          results: answer.results.map((result) => ({
            result: result.result,
            value: result.value,
          })),
        })),
        image: question.image, // Include image property
      })),
    };
    console.log("result", result);
  };

  useEffect(() => {
    // Reset state values when making a new API call
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
            maxWidth: "700px",
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
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Score: {score}
      </Typography>
    </Box>
  );
};

export default QuestionAnswer;
