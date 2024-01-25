import { Paper, Typography, Box, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

function CategoryGroup({ state, dispatch }) {
  const [categoryGroupData, setCategoryGroupData] = useState(null);
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/category/get/first/categorygroup/${state.categoryGroupNumber}`
        );

        const categoryIds = response.data.categoryGroups.map(
          (item) => item.categoryId
        );

        setCategoryGroupData(response.data);
        if (response.data.categoryGroups.length > 0) {
          const categoryIdsLength = categoryIds.length;
          dispatch({
            type: "set_categorygroup_length",
            payload: response.data.categoryGroups.length,
          });
          dispatch({
            type: "set_category_ids",
            payload: categoryIds, // Setting an array of categoryIds
          });
          dispatch({
            type: "set_category_length",
            payload: categoryIdsLength, // Setting the length of categoryIds
          });
        } else {
          dispatch({
            type: "set_last_question",
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
        {categoryGroupData ? (
          <Box>
            <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
              {categoryGroupData.categoryGroupHeading}
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
                __html: categoryGroupData.categoryGroupDescription,
              }}
            />
            <img
              width={isMobile ? 250 : 400}
              height={isMobile ? 250 : 400}
              src={categoryGroupData.categoryGroupImage}
              alt="preview"
              style={{
                marginTop: isMobile ? "8px" : "16px",
                marginBottom: isMobile ? "8px" : "5px",
              }}
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

export default CategoryGroup;
