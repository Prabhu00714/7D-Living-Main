import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";

const CategoryList = ({ state, dispatch }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (state.selectedCategoryGroupItem) {
          const response = await axios.get(
            `http://localhost:3001/api/qna/get/all/category/${state.selectedCategoryGroupItem._id}`
          );
          setItems(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [state.categoryRefreshFlag, state.selectedCategoryGroupItem, dispatch]);

  useEffect(() => {
    dispatch({
      type: "set_selected_category_item",
      payload: items[0],
    });
  }, [items, dispatch]);

  const handleItemClick = (item) => {
    dispatch({ type: "set_selected_category_item", payload: item });
  };

  return (
    <div>
      <div>
        <List>
          {items.map((item, index) => (
            <ListItem
              component="div"
              key={index}
              onClick={() => handleItemClick(item)}
              sx={{
                backgroundColor:
                  state.selectedCategoryItem &&
                  state.selectedCategoryItem._id === item._id
                    ? "#e0e0e0"
                    : "inherit",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  cursor: "default",
                },
                userSelect: "none", // Prevent text selection
              }}
            >
              <ListItemText primary={item.categoryHeading} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default CategoryList;
