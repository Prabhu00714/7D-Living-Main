import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";

const QuestionsList = ({ state, dispatch }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(state.selectedCategoryItem._id);
        if (state.selectedCategoryItem) {
          const response = await axios.get(
            `http://localhost:3001/api/qna/get/each/category/questions/${state.selectedCategoryItem._id}`
          );
          setItems(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, [state.questionsRefreshFlag, state.selectedCategoryItem, dispatch]);

  useEffect(() => {
    dispatch({
      type: "set_selected_question_item",
      payload: items[0],
    });
  }, [items, dispatch]);

  const handleItemClick = (item) => {
    dispatch({ type: "set_selected_question_item", payload: item });
  };

  return (
    <div>
      <div>
        <List>
          {items &&
            items.map((item, index) => (
              <ListItem
                component="div"
                key={index}
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
