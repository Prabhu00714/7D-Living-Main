import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CategoryGroup({ state, dispatch, isMobile, onAddItem }) {
  const handleDelete = () => {
    const categoryGroupId = state.selectedCategoryGroupItem._id;

    axios
      .delete(
        `http://localhost:3001/api/qna/delete/categorygroup/${categoryGroupId}`
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success(`Category Group Deleted Successfully`);
          onAddItem("categoryGroup");
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
      text: "Are you sure you want to delete this category group?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      } else {
        // extra code
      }
    });
  };

  const dispatchEditCategoryGroup = () => {
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
  };

  const showToastNotification = () => {
    // Replace this with your preferred toast notification library
    toast.warning("Please select a category before editing.");
  };

  return (
    <>
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
              state.selectedCategoryGroupItem
                ? dispatchEditCategoryGroup()
                : showToastNotification();
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

export default CategoryGroup;
