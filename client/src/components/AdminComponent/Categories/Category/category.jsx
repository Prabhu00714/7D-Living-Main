import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";

function Category({ state, dispatch, isMobile, onAddItem }) {
  const handleDelete = () => {
    const categoryId = state.selectedCategoryItem._id;

    axios
      .delete(`http://localhost:3001/api/qna/delete/category/${categoryId}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success(`Category Deleted Successfully`);
          onAddItem("category");
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
      text: "Are you sure you want to delete this category?",
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

  const dispatchEditCategory = () => {
    dispatch({ type: "set_category_modal", payload: true });
    dispatch({ type: "set_category_action", payload: "edit" });
    dispatch({ type: "set_model_type", payload: "category" });
    dispatch({ type: "set_model_name", payload: "Category" });
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
                payload: "category",
              });
              dispatch({
                type: "set_model_name",
                payload: "Category",
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
              state.selectedCategoryItem
                ? dispatchEditCategory()
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

export default Category;
