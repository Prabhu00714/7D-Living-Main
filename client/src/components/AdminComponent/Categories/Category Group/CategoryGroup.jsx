import React from "react";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function CategoryGroup({ state, dispatch }) {
  const handleDeleteConfirmation = () => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this category group?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            // Dispatch your delete action here
            dispatch({ type: "set_category_modal", payload: false });
            // Add additional dispatch for deletion if needed
          },
        },
        {
          label: "No",
          onClick: () => {}, // Do nothing on cancel
        },
      ],
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
