import React from "react";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";

function Questions({ state, dispatch, isMobile, onAddItem }) {
  const handleDelete = () => {
    const subCategoryId = state.selectedSubCategoryItem._id;
    const questionId = state.selectedQuestionItem._id;

    axios
      .delete(
        `http://localhost:3001/api/qna/delete/category/question/${questionId}`
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success(`Question Deleted Successfully`);
          onAddItem("questions");
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
      text: "Are you sure you want to delete this question?",
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
    <>
      <Stack direction="row" spacing={1} justifyContent="center">
        <Tooltip title="Add Question" arrow>
          <IconButton
            edge="end"
            aria-label="add"
            onClick={() => {
              dispatch({ type: "set_question_modal", payload: true });
            }}
            sx={{ color: "black" }}
            size="large"
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit Question" arrow>
          <IconButton
            edge="end"
            aria-label="add"
            onClick={() => {
              dispatch({ type: "set_question_modal", payload: true });
            }}
            sx={{ color: "black" }}
            size="large"
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Question" arrow>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={handleDeleteConfirmation}
            sx={{ color: "black" }}
            size="large"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Stack>
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
