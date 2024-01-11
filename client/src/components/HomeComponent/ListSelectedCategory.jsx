/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import QuestionAnswer from "./QuestionAnswer"; // Import the component

const ListSelectedCategory = ({ selectedComponent }) => {
  console.log("data haf", selectedComponent);
  const [categoryData, setCategoryData] = useState(null);

  const isMobile = useMediaQuery("(max-width: 600px)");

  const containerStyle = {
    marginLeft: isMobile ? 0 : 250,
    transition: "margin 0.5s",
    position: "absolute",
    top: 100,
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/category/get/each/qna",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            queryString: selectedComponent.category,
          }),
        }
      );

      if (response.ok) {
        const dataFromServer = await response.json();

        setCategoryData(dataFromServer);
      } else {
        console.error("Failed to fetch data from server");
      }
    } catch (error) {
      console.error("Error fetching data from server", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedComponent]);

  return (
    <div style={containerStyle}>
      {categoryData && (
        <QuestionAnswer data={categoryData[0]} fetchData={fetchData} />
      )}
    </div>
  );
};

export default ListSelectedCategory;
