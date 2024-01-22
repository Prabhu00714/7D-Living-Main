/* eslint-disable jsx-a11y/img-redundant-alt */
import {
  Paper,
  Typography,
  Box,
  useMediaQuery,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

function Questions({ state, dispatch }) {
  const [qnas, setQnasData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const questionIds = state.questionIds;

    const extractedQuestionIds = questionIds.map((obj) => obj.questionId);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/category/get/first/questions/${extractedQuestionIds}`
        );
        setQnasData(response.data);
        if (response.data.length < 0) {
          dispatch({
            type: "set_active_finish",
            payload: true,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [state.questionIds]);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSaveAnswers = () => {
    // Handle the selected answers (you can dispatch an action if needed)
    console.log("Selected answers:", selectedAnswers);
  };

  return (
    <Paper
      elevation={24}
      sx={{
        mt: isMobile ? 16 : 10,
        mb: isMobile ? 10 : 5,
        mx: "auto",
        height: "400px",
        minWidth: isMobile ? 200 : 300,
        maxWidth: isMobile ? 300 : 600,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: isMobile ? "8px" : "16px",
      }}
    >
      <PerfectScrollbar>
        {qnas.map((qna, index) => (
          <Box
            key={index}
            my={2}
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            alignItems="center"
          >
            <Box
              flex={1}
              style={{ marginRight: isMobile ? "0" : "16px" }}
              textAlign={isMobile ? "center" : "left"}
            >
              <Typography
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {index + 1}.{"    "}
                {qna.questiontext}
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label={`answers-${index}`}
                  name={`answers-${index}`}
                  value={selectedAnswers[qna._id] || ""}
                  onChange={(e) => handleAnswerChange(qna._id, e.target.value)}
                >
                  {qna.answers.map((answer, ansIndex) => (
                    <FormControlLabel
                      key={ansIndex}
                      value={answer.answer}
                      control={<Radio />}
                      label={answer.answer}
                    />
                  ))}
                  {qna.answers.map((answer, ansIndex) => (
                    <div key={ansIndex}>
                      {answer.answerimage && (
                        <img
                          width={isMobile ? "100%" : "150"}
                          height={isMobile ? "auto" : "150"}
                          src={answer.answerimage}
                          alt="answer image"
                          style={{ marginLeft: "16px" }}
                        />
                      )}
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
            {qna.questionimage && (
              <img
                width={isMobile ? "100%" : "150"}
                height={isMobile ? "auto" : "150"}
                src={qna.questionimage}
                alt="question image"
              />
            )}
          </Box>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveAnswers}
          style={{ marginTop: "16px" }}
        >
          Save Answers
        </Button>
      </PerfectScrollbar>
    </Paper>
  );
}

export default Questions;
