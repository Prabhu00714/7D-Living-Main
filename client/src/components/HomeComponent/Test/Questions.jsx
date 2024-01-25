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
import { useAuth } from "../../../AuthContext";
import { ToastContainer, toast } from "react-toastify";

function Questions({ state, dispatch }) {
  const { user } = useAuth();
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

  const handleSaveAnswers = async () => {
    // Check if all questions are answered
    const unansweredQuestions = qnas.filter((qna) => !selectedAnswers[qna._id]);

    if (unansweredQuestions.length > 0) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    const results = [];

    for (const [questionId, answerId] of Object.entries(selectedAnswers)) {
      const qna = qnas.find((qna) => qna._id === questionId);
      const selectedAnswer = qna.answers.find(
        (answer) => answer.answer === answerId
      );

      results.push({
        questionId: questionId,
        answerId: selectedAnswer._id,
        results: selectedAnswer.results.map((result) => ({
          result: result.result,
          value: result.value,
        })),
      });
    }

    const resultsJSON = JSON.stringify(results);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/category/post/user/result",
        { username: user.username, result: JSON.parse(resultsJSON) }
      );

      if (response.status === 200) {
        toast.success("Answers saved successfully.");
      } else {
        toast.error("Failed to save answers. Please try again.");
      }
    } catch (error) {
      console.error("Error saving answers:", error);
      toast.error("Failed to save answers. Please try again.");
    }
  };

  return (
    <>
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
        }}
      >
        <PerfectScrollbar>
          {qnas.map((qna, index) => (
            <Box
              key={index}
              ml={1}
              my={2}
              display="flex"
              flexDirection={isMobile ? "column" : "row"}
              alignItems={isMobile ? "center" : "flex-start"}
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
                    onChange={(e) =>
                      handleAnswerChange(qna._id, e.target.value)
                    }
                  >
                    {qna.answers.map((answer, ansIndex) => (
                      <Box
                        key={ansIndex}
                        display="flex"
                        flexDirection="column"
                        alignItems={isMobile ? "center" : "flex-start"}
                        sx={{ marginTop: "8px" }}
                      >
                        <FormControlLabel
                          value={answer.answer}
                          control={<Radio />}
                          label={answer.answer}
                        />
                        {answer.answerimage && (
                          <img
                            width={isMobile ? "50%" : "25%"}
                            height={isMobile ? "50%" : "20%"}
                            src={answer.answerimage}
                            alt="answer image"
                            style={{ marginLeft: "8px" }}
                          />
                        )}
                      </Box>
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
              {qna.questionimage && (
                <img
                  width={isMobile ? "50%" : "25%"}
                  height={isMobile ? "50%" : "25%"}
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
    </>
  );
}

export default Questions;
