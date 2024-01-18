import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";

const QuestionsList = ({ state, dispatch }) => {
  useEffect(() => {
    dispatch({
      type: "set_selected_question_item",
      payload: state.questions[0],
    });
  }, [state.questions, dispatch]);

  const handleItemClick = (item) => {
    dispatch({ type: "set_selected_question_item", payload: item });
  };

  return (
    <div>
      <div>
        <List>
          {Array.isArray(state.questions) &&
            state.questions.map((item) => (
              <ListItem
                component="div"
                key={item._id}
                onClick={() => handleItemClick(item)}
                sx={{
                  backgroundColor:
                    state.selectedQuestionItem &&
                    state.selectedQuestionItem._id === item._id
                      ? "#c0c0c0"
                      : "inherit",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    cursor: "default",
                  },
                  userSelect: "none", // Prevent text selection
                }}
              >
                <ListItemText primary={item.questiontext} />
              </ListItem>
            ))}
        </List>
      </div>
    </div>
  );
};

export default QuestionsList;
