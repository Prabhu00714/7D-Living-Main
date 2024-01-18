import React from "react";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";

function CategoryGroup({ state, dispatch }) {
  const handleDelete = () => {
    const categoryGroupId = state.selectedCategoryGroupItem._id;
    console.log("delete", categoryGroupId);

    axios
      .delete(
        `http://localhost:3001/api/qna/delete/categorygroup/${categoryGroupId}`
      )
      .then((response) => {
        // Handle successful deletion, update state, etc.
        console.log("Category group deleted successfully");
      })
      .catch((error) => {
        // Handle error, show error message, etc.
        console.error("Error deleting category group", error);
      })
      .finally(() => {
        // You may want to perform some cleanup or additional actions here
        // For example, close a modal, update state, etc.
        dispatch({ type: "set_category_modal", payload: false });
      });
  };

  const handleDeleteConfirmation = () => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this category group?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      } else {
        dispatch({ type: "set_category_modal", payload: false });
      }
    });
  };

  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      <Tooltip title="Add Category" arrow>
        <IconButton
          edge="end"
          aria-label="add"
          onClick={() => {
            dispatch({ type: "set_category_modal", payload: true });
            dispatch({ type: "set_category_action", payload: "add" });
            dispatch({
              type: "set_model_type",
              payload: "categoryGroup",
            });
            dispatch({
              type: "set_model_name",
              payload: "Category Group",
            });
          }}
          sx={{ color: "black" }}
          size="large"
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit Category" arrow>
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={() => {
            dispatch({ type: "set_category_modal", payload: true });
            dispatch({ type: "set_category_action", payload: "edit" });
            dispatch({
              type: "set_model_type",
              payload: "categoryGroup",
            });
            dispatch({
              type: "set_model_name",
              payload: "Category Group",
            });
          }}
          sx={{ color: "black" }}
          size="large"
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Category" arrow>
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
  );
}

export default CategoryGroup;
