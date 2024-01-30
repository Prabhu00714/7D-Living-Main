/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useReducer } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "axios";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Box } from "@mui/material";
import QuestionsList from "./QuestionsList";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: "90%",
  height: "80vh",
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  "& > div": {
    maxHeight: "100%",
    overflowY: "auto",
    paddingRight: theme.spacing(1),
  },
}));

const initialState = {
  selectedQuestionItem: null,
  questionsRefreshFlag: false,
  questions: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_selected_question_item":
      return { ...state, selectedQuestionItem: action.payload };
    case "set_questions_refresh_flag":
      return { ...state, questionsRefreshFlag: action.payload };
    case "set_questions":
      return { ...state, questions: action.payload };
    default:
      return state;
  }
};

const Questions = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [state, dispatch] = useReducer(reducer, initialState);

  const containerStyle = {
    marginLeft: isMobile ? 30 : 250,
    transition: "margin 0.5s",
    display: "flex",
    marginTop: 75,
  };

  const handleAddItem = (data) => {
    switch (data) {
      case "questions":
        dispatch({
          type: "set_questions_refresh_flag",
          payload: !state.questionsRefreshFlag,
        });
        break;
      default:
        throw new Error("Invalid question action");
    }
  };

  const handleDelete = () => {
    const questionId = state.selectedQuestionItem._id;

    axios
      .delete(
        `http://localhost:3001/api/qna/delete/each/question/${questionId}`
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success(`Question Deleted Successfully`);
          handleAddItem("questions");
        }
      })
      .catch((error) => {
        // Handle error, show error message, etc.
        console.error("Error deleting category group", error);
      });
  };

  const handleDeleteConfirmation = () => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this question set?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      } else {
        // example codes to clear up
      }
    });
  };

  return (
    <div style={containerStyle}>
      <DemoPaper square={false} elevation={12}>
        <Tooltip
          title="Delete Question Set"
          arrow
          style={{ alignSelf: "flex-end", marginRight: "10px" }}
        >
          <IconButton
            aria-label="delete"
            onClick={handleDeleteConfirmation}
            sx={{ color: "black", width: "3rem", height: "3rem" }} // Adjust size here
          >
            <DeleteIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Tooltip>
        <PerfectScrollbar options={{ wheelPropagation: false }}>
          <QuestionsList state={state} dispatch={dispatch} />
        </PerfectScrollbar>
      </DemoPaper>
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
    </div>
  );
};

export default Questions;
