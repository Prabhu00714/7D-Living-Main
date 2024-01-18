import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import axios from "axios";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddQuestionsModal = ({ state, dispatch, onAddItem, isMobile }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState(new Set());
  const [selectedQuestionsArray, setSelectedQuestionsArray] = useState([]);

  const handleClose = () => {
    dispatch({ type: "set_question_modal", payload: false });
  };

  const handleSubmit = async () => {
    dispatch({
      type: "set_questions",
      payload: selectedQuestionsArray,
    });

    const formattedQuestionIds = selectedQuestionsArray.map((question) => ({
      _id: question._id,
    }));
    console.log("ids", formattedQuestionIds);

    try {
      const response = await axios.post(
        `http://localhost:3001/api/qna/post/questions/${state.selectedSubCategoryItem._id}`,
        { questions: formattedQuestionIds }
      );

      // Handle the response if needed
      console.log("Backend response:", response.data);
      if (response.status === 200) {
        toast.success(`New Question Added Successfully`);
        setSelectedQuestions(new Set());
        setSelectedQuestionsArray([]);
        onAddItem("questions");
      }
    } catch (error) {
      console.error("Error posting questions:", error);
    }

    handleClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/qna/get/all/question"
        );
        setQuestions(response.data); // Assuming the API response is an array of questions
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, []); // Run the effect only once when the component mounts

  const handleListItemClick = (question) => {
    const newSelectedQuestions = new Set(selectedQuestions);
    const newSelectedQuestionsArray = [];

    if (newSelectedQuestions.has(question.questiontext)) {
      newSelectedQuestions.delete(question.questiontext);
    } else {
      newSelectedQuestions.add(question.questiontext);
    }

    newSelectedQuestions.forEach((text) => {
      const selectedQuestion = questions.find((q) => q.questiontext === text);
      if (selectedQuestion) {
        newSelectedQuestionsArray.push({
          _id: selectedQuestion._id,
          questiontext: selectedQuestion.questiontext,
        });
      }
    });

    setSelectedQuestions(newSelectedQuestions);
    setSelectedQuestionsArray(newSelectedQuestionsArray);
  };

  return (
    <>
      <Dialog
        open={state.questionModal}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Title</DialogTitle>
        <Divider />
        <PerfectScrollbar>
          <DialogContent>
            <List>
              {questions.map((question) => (
                <ListItem
                  key={question._id}
                  onClick={() => handleListItemClick(question)}
                  sx={{
                    backgroundColor: selectedQuestions.has(
                      question.questiontext
                    )
                      ? "#c0c0c0"
                      : "inherit",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                      cursor: "default",
                    },
                    userSelect: "none",
                  }}
                >
                  <ListItemText primary={question.questiontext} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </PerfectScrollbar>

        <Divider />

        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
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
};

export default AddQuestionsModal;
