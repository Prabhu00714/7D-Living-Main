import { Paper, Typography, Box, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Category({ state, dispatch }) {
  const [categoryData, setCategoryData] = useState(null);
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/category/get/first/category/${state.eachCategoryIds}`
        );
        setCategoryData(response.data);

        // Check if there are subcategories or questions
        if (response.data.categories && response.data.categories.length > 0) {
          const subcategories = response.data.categories.filter(
            (category) => category.subCategoryId
          );
          const hasSubcategories = subcategories.length > 0;

          if (hasSubcategories) {
            dispatch({
              type: "set_subcategory_length",
              payload: subcategories.length,
            });
            dispatch({
              type: "set_common_type",
              payload: "subcategory",
            });
            dispatch({
              type: "set_subcategory_ids",
              payload: subcategories,
            });
            dispatch({
              type: "set_subcategory_number",
              payload: 0,
            });
          } else {
            dispatch({
              type: "set_common_type",
              payload: "questions",
            });
            dispatch({
              type: "set_question_ids",
              payload: response.data.categories,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper
      elevation={24}
      sx={{
        mt: isMobile ? 16 : 10,
        mx: "auto",
        height: 400,
        minWidth: isMobile ? 200 : 300,
        maxWidth: isMobile ? 300 : 600,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: isMobile ? "8px" : "16px",
      }}
    >
      {categoryData ? (
        <Box>
          <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
            {categoryData.categoryHeading}
          </Typography>
          <Typography
            variant={isMobile ? "body2" : "body1"}
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: "center",
            }}
            paragraph
          >
            {categoryData.categoryDescription}
          </Typography>
          <img
            width={isMobile ? 150 : 200}
            height={isMobile ? 150 : 200}
            src={categoryData.categoryImage}
            alt="preview"
            style={{ marginTop: isMobile ? "8px" : "16px" }}
          />
        </Box>
      ) : (
        <Typography variant={isMobile ? "body2" : "body1"}>
          Loading...
        </Typography>
      )}
    </Paper>
  );
}

export default Category;
