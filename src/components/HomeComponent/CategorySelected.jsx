import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import QuestionAnswerComponent from "./QuestionAnswerComponent"; // Import the component

const CategorySelected = ({ selectedComponent }) => {
  const [categoryData, setCategoryData] = useState(null);

  const isMobile = useMediaQuery("(max-width: 600px)");

  const containerStyle = {
    marginLeft: isMobile ? 0 : 250,
    transition: "margin 0.5s",
    position: "absolute",
    top: 100,
  };

  useEffect(() => {
    const fetchDataFromServer = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/fetchDataFromMongo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ queryString: selectedComponent }),
          }
        );

        if (response.ok) {
          const dataFromServer = await response.json();
          // console.log("Data fetched from server:", dataFromServer);

          setCategoryData(dataFromServer);
        } else {
          console.error("Failed to fetch data from server");
        }
      } catch (error) {
        console.error("Error fetching data from server", error);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchDataFromServer();
  }, [selectedComponent]);

  return (
    <div style={containerStyle}>
      {categoryData && <QuestionAnswerComponent data={categoryData} />}
    </div>
  );
};

export default CategorySelected;
