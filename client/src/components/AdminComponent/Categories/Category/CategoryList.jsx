import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, Tooltip } from "@mui/material";

const CategoryList = ({ state, dispatch }) => {
  const items = ["Category Group 1", "Category Group 2", "Category Group 3"];

  const handleItemDoubleClick = (item) => {
    dispatch({ type: "set_selected_item", payload: item });
  };

  const handleClearClick = () => {
    dispatch({ type: "set_selected_item", payload: null });
  };

  return (
    <div>
      <div>
        <List>
          {items.map((item, index) => (
            <ListItem
              component="div"
              key={index}
              onDoubleClick={() => handleItemDoubleClick(item)}
              sx={{
                backgroundColor:
                  state.selectedItem === item ? "#e0e0e0" : "inherit",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  cursor: "default",
                },
                userSelect: "none", // Prevent text selection
              }}
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </div>
      <div>
        <Tooltip title="Clear" arrow>
          <IconButton
            edge="center"
            aria-label="clear"
            onClick={handleClearClick}
            sx={{ color: "black" }}
            size="large"
          >
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default CategoryList;
