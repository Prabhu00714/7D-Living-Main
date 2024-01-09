import { Tab, Typography, Box } from "@mui/material";
import React, { useState } from "react";

const TabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const QuestionAnswerComponent = ({ data }) => {
  const [subSelectedOptions, setSubSelectedOptions] = useState({});
  const [tabValue, setTabValue] = useState(0);

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
    <div>
      <Box>
        {data[0].data.map((categoryData, categoryIndex) => (
          <TabPanel key={categoryIndex} value={tabValue} index={categoryIndex}>
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
                      width={200}
                      height={200}
                      src={question.image}
                      alt="preview"
                    />
                  )}
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            ))}
          </TabPanel>
        ))}
      </Box>
    </div>
  );
};

export default QuestionAnswerComponent;
