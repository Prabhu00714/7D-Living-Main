import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";

const SubCategoryList = ({ state, dispatch }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (state.selectedCategoryItem) {
          const response = await axios.get(
            `http://localhost:3001/api/qna/get/all/subcategory/${state.selectedCategoryItem._id}`
          );
          setItems(response.data);
        } else if (!state.selectedCategoryItem) {
          setItems("");
        } else {
          setItems("");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, [state.subCategoryRefreshFlag, state.selectedCategoryItem, dispatch]);

  useEffect(() => {
    dispatch({
      type: "set_selected_subcategory_item",
      payload: items[0],
    });
  }, [items, dispatch]);

  const handleItemClick = (item) => {
    dispatch({ type: "set_selected_subcategory_item", payload: item });
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
                    state.selectedSubCategoryItem &&
                    state.selectedSubCategoryItem._id === item._id
                      ? "#c0c0c0"
                      : "inherit",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    cursor: "default",
                  },
                  userSelect: "none", // Prevent text selection
                }}
              >
                <ListItemText primary={item.subCategoryHeading} />
              </ListItem>
            ))}
        </List>
      </div>
    </div>
  );
};

export default SubCategoryList;
