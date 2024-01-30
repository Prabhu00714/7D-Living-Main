/* eslint-disable react-hooks/exhaustive-deps */
import { Paper, Typography, Box, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

function Category({ state, dispatch }) {
  const [categoryData, setCategoryData] = useState(null);
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({
          type: "set_category_question_number",
          payload: state.eachCategoryIds,
        });
        const response = await axios.get(
          `http://localhost:3001/api/category/get/first/category/${state.eachCategoryIds}`
        );
        setCategoryData(response.data);

        if (response.data.categories && response.data.categories.length > 0) {
          // Filter subcategories and questions from categories
          const subcategories = response.data.categories.filter(
            (category) => category.subCategoryId
          );

          const questions = response.data.categories.filter(
            (category) => category.questionId
          );

          if (subcategories.length > 0) {
            // If there are subcategories, update state accordingly
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
          } else if (questions.length > 0) {
            // If there are questions but no subcategories, update state for questions
            dispatch({
              type: "set_common_type",
              payload: "questions",
            });
            dispatch({
              type: "set_question_ids",
              payload: questions,
            });
          }
        } else {
          // If no categories found, set active finish to true
          dispatch({
            type: "set_active_finish",
            payload: true,
          });
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
      <PerfectScrollbar options={{ wheelPropagation: false }}>
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
                marginRight: "10px",
              }}
              paragraph
              dangerouslySetInnerHTML={{
                __html: categoryData.categoryDescription,
              }}
            />
            <img
              width={isMobile ? 250 : 400}
              height={isMobile ? 250 : 400}
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
      </PerfectScrollbar>
    </Paper>
  );
}

export default Category;
