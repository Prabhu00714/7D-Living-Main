import React, { useState, useEffect, useRef } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";

const CategoryGroupList = ({ state, dispatch }) => {
  const [items, setItems] = useState([]);
  const isInitialRender = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/qna/get/all/categorygroup"
        );
        setItems(response.data);

        if (isInitialRender.current && response.data.length > 0) {
          dispatch({
            type: "set_selected_categorygroup_item",
            payload: response.data[0],
          });
          isInitialRender.current = false;
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [items, dispatch]);

  const handleItemClick = (item) => {
    dispatch({ type: "set_selected_categorygroup_item", payload: item });
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
                  state.selectedCategoryGroupItem &&
                  state.selectedCategoryGroupItem._id === item._id
                    ? "#e0e0e0"
                    : "inherit",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  cursor: "default",
                },
                userSelect: "none", // Prevent text selection
              }}
            >
              <ListItemText primary={item.categoryGroupHeading} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default CategoryGroupList;
