import React from "react";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";

function Category({ state, dispatch }) {
  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      <Tooltip title="Add Category" arrow>
        <IconButton
          edge="end"
          aria-label="add"
          onClick={() =>
            dispatch({ type: "CATEGORIES_MODAL_OPEN", payload: true })
          }
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
          onClick={() =>
            dispatch({ type: "CATEGORIES_MODAL_OPEN", payload: true })
          }
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
          onClick={() =>
            dispatch({ type: "CATEGORIES_MODAL_CLOSE", payload: false })
          }
          sx={{ color: "black" }}
          size="large"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

export default Category;