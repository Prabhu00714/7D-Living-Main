import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";

const CategoryGroupList = ({ state, dispatch }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/qna/get/all/categorygroup"
        );
        setItems(response.data);
      } catch (error) {
        setItems("");
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [state.categoryGroupRefreshFlag, dispatch]);

  useEffect(() => {
    dispatch({
      type: "set_selected_categorygroup_item",
      payload: items[0],
    });
  }, [items, dispatch]);

  const handleItemClick = (item) => {
    dispatch({ type: "set_selected_categorygroup_item", payload: item });
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
                    state.selectedCategoryGroupItem &&
                    state.selectedCategoryGroupItem._id === item._id
                      ? "#c0c0c0"
                      : "inherit",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    cursor: "default",
                  },
                  userSelect: "none",
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
