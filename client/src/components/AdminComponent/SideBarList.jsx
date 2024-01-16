/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import AddIcon from "@mui/icons-material/Add";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { ListItemText } from "@mui/material";

const SideBarList = ({ onSelectCategory, getCategory }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("new category");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/category/get/each/Categories")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [getCategory]);

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
        {/* Add New Category button */}
        <ListItemButton
          onClick={() => {
            onSelectCategory("new category");
            setSelectedCategory("new category");
          }}
          selected={selectedCategory === "new category"}
          sx={{
            minHeight: 48,
            justifyContent: "initial",
            px: 2.5,
            backgroundColor:
              selectedCategory === "new category"
                ? "rgba(0, 0, 0, 0.8)"
                : "inherit",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <ListItemText
            primary={
              <Typography
                variant="body1"
                style={{
                  fontFamily: "YourFont",
                  fontSize: "25px",
                }}
              >
                Categories
              </Typography>
            }
          />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            onSelectCategory("new qna");
            setSelectedCategory("new qna");
          }}
          selected={selectedCategory === "new qna"}
          sx={{
            minHeight: 48,
            justifyContent: "initial",
            px: 2.5,
            backgroundColor:
              selectedCategory === "new qna" ? "rgba(0, 0, 0, 0.8)" : "inherit",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <ListItemText
            primary={
              <Typography
                variant="body1"
                style={{
                  fontFamily: "YourFont",
                  fontSize: "20px",
                }}
              >
                QA
              </Typography>
            }
          />{" "}
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            onSelectCategory("new users");
            setSelectedCategory("new users");
          }}
          selected={selectedCategory === "new users"}
          sx={{
            minHeight: 48,
            justifyContent: "initial",
            px: 2.5,
            backgroundColor:
              selectedCategory === "new users"
                ? "rgba(0, 0, 0, 0.8)"
                : "inherit",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <ListItemText
            primary={
              <Typography
                variant="body1"
                style={{
                  fontFamily: "YourFont",
                  fontSize: "20px",
                }}
              >
                Users
              </Typography>
            }
          />
        </ListItemButton>

        {/* Dynamic categories */}
        {/* {categories.map((category) => (
          <ListItemButton
            key={category._id} // Use the _id as the key
            onClick={() => {
              onSelectCategory(category._id);
              setSelectedCategory(category._id);
            }}
            selected={selectedCategory === category._id}
            sx={{
              minHeight: 48,
              justifyContent: "initial",
              px: 2.5,
              backgroundColor:
                selectedCategory === category._id
                  ? "rgba(0, 0, 0, 0.8)"
                  : "inherit",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <ListItemText
              primary={renderMultiLineText(category.category, 20)}
            />
          </ListItemButton>
        ))} */}
      </List>
    </PerfectScrollbar>
  );
};

export default SideBarList;
