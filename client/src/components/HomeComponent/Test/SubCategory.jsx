import { Paper, Typography, Box, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

function SubCategory({ state, dispatch }) {
  const [subCategoryData, setSubCategoryData] = useState(null);
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/category/get/first/subcategory/${state.eachSubCategoryIds.subCategoryId}`
        );
        setSubCategoryData(response.data);
        dispatch({
          type: "set_question_ids",
          payload: response.data.questions,
        });
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
      {subCategoryData ? (
        <Box>
          <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
            {subCategoryData.subCategoryHeading}
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
            {subCategoryData.subCategoryDescription}
          </Typography>
          {subCategoryData.subCategoryImage && (
            <img
              width={isMobile ? 150 : 200}
              height={isMobile ? 150 : 200}
              src={subCategoryData.subCategoryImage}
              alt="preview"
              style={{ marginTop: isMobile ? "8px" : "16px" }}
            />
          )}
        </Box>
      ) : (
        <Typography variant={isMobile ? "body2" : "body1"}>
          Loading...
        </Typography>
      )}
    </Paper>
  );
}

export default SubCategory;
