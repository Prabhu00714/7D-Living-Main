/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import axios from "axios";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddQuestionsList from "./Questions/AddQuestionsList";
import UpdateQuestionList from "./Questions/UpdateQuestionList";

const AddEditQuestionsModal = ({
  state,
  dispatch,
  onAddItem,
  isMobile,
  fileInputRef,
  resetForm,
}) => {
  const [questions, setQuestions] = useState([
    {
      questiontext: "",
      answers: [
        {
          answer: "",
          answerimage: "", // Add answerImage property
          results: [{ result: "", value: "" }],
        },
      ],
      questionimage: "",
    },
  ]);
  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    dispatch({ type: "set_question_modal", payload: false });
  };

  const handleAdd = async () => {
    try {
      const isInvalidData = state.questions.some(
        (question) =>
          !question.questiontext.trim() ||
          !question.answers.every(
            (answer) =>
              !!answer.answer.trim() &&
              answer.results.every(
                (result) => !!result.result.trim() && !!result.value.trim()
              )
          )
      );

      if (isInvalidData) {
        toast.error("Please fill in all fields.");
        return;
      }

      const jsonData = state.questions.map((question) => ({
        questiontext: question.questiontext,
        questionimage: question.questionimage,
        answers: question.answers.map((answer) => ({
          answer: answer.answer,
          answerimage: answer.answerimage,
          results: answer.results,
        })),
      }));

      await axios.post(
        `http://localhost:3001/api/qna/post/each/category/qna/${state.selectedCategoryItem._id}`,
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: "set_question_modal", payload: false });
      onAddItem("questions");
      toast.success("Data added successfully!");
    } catch (error) {
      console.error("Error sending data to the backend:", error);
      toast.error("Failed to add data!");
    }
    resetForm();
  };

  const handleEdit = async () => {
    try {
      const isInvalidData = questions.some(
        (question) =>
          !question.questiontext.trim() ||
          !question.answers.every(
            (answer) =>
              !!answer.answer.trim() &&
              answer.results.every(
                (result) => !!result.result.trim() && !!result.value.trim()
              )
          )
      );

      if (isInvalidData) {
        toast.error("Please fill in all fields.");
        return;
      }

      const jsonData = {
        questiontext: questions[0].questiontext,
        questionimage: questions[0].questionimage,
        answers: questions[0].answers.map((answer) => ({
          answer: answer.answer,
          answerimage: answer.answerimage,
          results: answer.results,
        })),
      };

      await axios.post(
        `http://localhost:3001/api/qna/update/each/question/${state.selectedQuestionItem._id}`,
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Data updated successfully!");
      onAddItem("questions");
      dispatch({ type: "set_question_modal", payload: false });
    } catch (error) {
      console.error("Error sending data to the backend:", error);
      toast.error("Failed to update data!");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={state.questionModal}
      >
        {/* Header */}
        <DialogTitle>
          {state.questionAction === "add"
            ? `Add New Question`
            : "Edit Question"}
        </DialogTitle>

        {/* Divider above Body */}
        <Divider />

        {/* Body */}
        <PerfectScrollbar>
          <DialogContent>
            {state.questionAction === "add" ? (
              <AddQuestionsList
                state={state}
                dispatch={dispatch}
                fileInputRef={fileInputRef}
              />
            ) : (
              <UpdateQuestionList
                state={state}
                questions={questions}
                setQuestions={setQuestions}
              />
            )}
          </DialogContent>
        </PerfectScrollbar>

        <Divider />

        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={state.questionAction === "add" ? handleAdd : handleEdit}
            startIcon={
              state.questionAction === "add" ? (
                <SaveIcon />
              ) : (
                <BorderColorIcon />
              )
            }
          >
            {state.questionAction === "add" ? "Add" : "Edit"}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClose}
            startIcon={<CloseIcon />}
          >
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

export default AddEditQuestionsModal;
