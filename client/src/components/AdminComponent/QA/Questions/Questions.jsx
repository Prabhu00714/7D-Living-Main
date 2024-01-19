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
  const handleDelete = (API) => {
    axios
      .delete(API)
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
    const checkboxHtml = `
    <div style="display: flex; flex-direction: column; align-items: center;">
      <div style="display: flex; flex-direction: column; align-items: start;">
        <label style="margin-bottom: 5px;">
          <input type="checkbox" id="checkbox" name="checkbox" value="value"> Delete Category and Question
        </label>
      </div>
    </div>
  `;

    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this question?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      html: checkboxHtml,
    }).then((result) => {
      if (result.isConfirmed) {
        const checkboxValue = document.getElementById("checkbox").checked;

        let API;
        const categoryId = state.selectedCategoryItem._id;
        const questionId = state.selectedQuestionItem._id;

        if (checkboxValue) {
          API = `http://localhost:3001/api/qna/delete/category/question/${categoryId}/${questionId}`; // Replace with your actual value
          console.log("Checkbox selected");
          console.log("Variable:", API);
        } else {
          API = `http://localhost:3001/api/qna/delete/categoryonly/question/${categoryId}/${questionId}`; // Replace with your actual value
          console.log("Checkbox not selected");
        }

        handleDelete(API);
      } else {
        // Handle cancellation
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
              dispatch({
                type: "set_question_action",
                payload: "add",
              });
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
              dispatch({
                type: "set_question_action",
                payload: "edit",
              });
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
