import React from "react";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SubCategory({ state, dispatch, isMobile, onAddItem }) {
  const handleDelete = () => {
    const subCategoryId = state.selectedSubCategoryItem._id;

    axios
      .delete(
        `http://localhost:3001/api/qna/delete/subcategory/${subCategoryId}`
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success(`Sub Category Deleted Successfully`);
          dispatch({
            type: "set_selected_subcategory_item",
            payload: null,
          });
          onAddItem("subCategory");
        }
      })
      .catch((error) => {
        console.error("Error deleting category group", error);
      });
  };

  const handleDeleteConfirmation = () => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this sub category?",
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

  const dispatchEditSubCategory = () => {
    dispatch({ type: "set_category_modal", payload: true });
    dispatch({ type: "set_category_action", payload: "edit" });
    dispatch({
      type: "set_model_type",
      payload: "subCategory",
    });
    dispatch({
      type: "set_model_name",
      payload: "Sub Category",
    });
  };

  const showToastNotification = () => {
    toast.warning("Please select a sub category before editing.");
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
              dispatch({ type: "set_model_type", payload: "subCategory" });
              dispatch({
                type: "set_model_name",
                payload: "Sub Category",
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
              state.selectedSubCategoryItem
                ? dispatchEditSubCategory()
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

export default SubCategory;
