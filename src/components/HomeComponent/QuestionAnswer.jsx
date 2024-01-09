import { Paper, Typography, Box } from "@mui/material";
import React, { useState } from "react";

const QuestionAnswer = ({ data }) => {
  const [subSelectedOptions, setSubSelectedOptions] = useState({});

  const handleSubOptionSelect = (questionIndex, answerIndex) => {
    setSubSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionIndex]: answerIndex,
    }));
  };

  if (!data || !data[0]?.data) {
    console.log("Data is missing properties");
    return <div>No data available</div>;
  }

  return (
    <Box>
      {data[0].data.map((categoryData, categoryIndex) => (
        <div key={categoryIndex}>
          <Typography
            variant="h5"
            sx={{
              color: "black",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            {categoryData.category}
          </Typography>

          {categoryData.questions.map((question, questionIndex) => (
            <Paper
              key={questionIndex}
              sx={{
                padding: "16px",
                marginBottom: "16px",
                maxWidth: "700px", // Set your desired maxWidth here
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
                      fontSize: "16px",
                    }}
                  >
                    {questionIndex + 1}. {question.questiontext}
                  </Typography>
                  &nbsp;
                  {question.answers &&
                    question.answers.map((answer, answerIndex) => (
                      <div key={answerIndex}>
                        <label
                          sx={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                          <input
                            type="radio"
                            name={`sub-${questionIndex}`}
                            onChange={() =>
                              handleSubOptionSelect(questionIndex, answerIndex)
                            }
                            checked={
                              subSelectedOptions[questionIndex] === answerIndex
                            }
                          />
                          &nbsp;&nbsp;&nbsp;{answer.answer}
                        </label>
                      </div>
                    ))}
                </div>
                <div>
                  {question.image && (
                    <img
                      width={120}
                      height={120}
                      src={question.image}
                      alt="preview"
                    />
                  )}
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            </Paper>
          ))}
        </div>
      ))}
    </Box>
  );
};

export default QuestionAnswer;
