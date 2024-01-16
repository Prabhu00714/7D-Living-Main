import React from "react";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";

function Questions({ state, dispatch }) {
  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      <Tooltip title="Add Category" arrow>
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
      <Tooltip title="Delete Category" arrow>
        <IconButton
          edge="end"
          aria-label="delete"
          // onClick={() =>
          //   dispatch({ type: "set_question_modal", payload: false })
          // }
          sx={{ color: "black" }}
          size="large"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

export default Questions;
