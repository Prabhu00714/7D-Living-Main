// CategoryList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { ListItemText } from "@mui/material";

const CategoryList = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Fetch category names from the backend
    axios
      .get("http://localhost:3001/api/category/get/each/Categories") // Adjust the endpoint URL
      .then((response) => {
        setCategories(response.data.categories); // Assuming response.data is an object with a 'categories' property
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Log the categories when they are updated
  useEffect(() => {
    console.log("Categories:", categories);
  }, [categories]);

  const renderMultiLineText = (text, maxCharsPerLine) => {
    const lines = [];
    let currentLine = "";

    text.split(" ").forEach((word) => {
      if ((currentLine + " " + word).length <= maxCharsPerLine) {
        currentLine += (currentLine === "" ? "" : " ") + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine !== "") {
      lines.push(currentLine);
    }

    return lines.map((line, index) => (
      <Typography key={index} variant="body2" color="textPrimary">
        {line}
      </Typography>
    ));
  };

  return (
    <PerfectScrollbar>
      <List sx={{ overflowX: "hidden", mt: -1 }}>
        {categories.map((category) => (
          <ListItemButton
            key={category}
            onClick={() => {
              onSelectCategory(category.trim());
              setSelectedCategory(category);
            }}
            selected={selectedCategory === category}
            sx={{
              minHeight: 48,
              justifyContent: "initial",
              px: 2.5,
              backgroundColor:
                selectedCategory === category
                  ? "rgba(0, 0, 0, 0.8)" // Darker background for selected item
                  : "inherit",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 3,
                justifyContent: "center",
              }}
            >
              <QuestionAnswerIcon />
            </ListItemIcon>
            <ListItemText
              sx={{ opacity: 1 }}
              primary={renderMultiLineText(category, 20)}
            />
          </ListItemButton>
        ))}
      </List>
    </PerfectScrollbar>
  );
};

export default CategoryList;
