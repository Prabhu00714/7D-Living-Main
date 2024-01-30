/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Box } from "@mui/material";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: "90%",
  height: "80vh",
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  "& > div": {
    maxHeight: "100%",
    overflowY: "auto",
    paddingRight: theme.spacing(1),
  },
}));

const Report = () => {
  const { user } = useAuth();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [aggregatedResults, setAggregatedResults] = useState([]);
  const [result, setResult] = useState([]);

  const [conditions, setConditions] = useState("");
  const [categoryMostOccurring, setCategoryMostOccurring] = useState({});

  useEffect(() => {
    if (user) {
      axios
        .get(
          `http://localhost:3001/api/qna/get/aggregatedResults/${user.username}`
        )
        .then((response) => {
          const data = response.data;
          setAggregatedResults(data);

          const categoryMostOccurringData = {};
          data.forEach((category) => {
            let totalScore = 0;
            category.aggregatedResults.forEach((result) => {
              totalScore += result.totalScore;
            });

            const mostOccurringData = {};
            category.aggregatedResults.forEach((result) => {
              const percentage = (result.totalScore / totalScore) * 100;
              mostOccurringData[result.resultName] = {
                totalScore: result.totalScore,
                percentage: percentage.toFixed(2), // Round percentage to two decimal places
              };
            });

            categoryMostOccurringData[category.categoryId] = mostOccurringData;
          });
          setCategoryMostOccurring(categoryMostOccurringData);

          const MARGIN = 3; // Margin of 2-3 points

          const categoryIds = Object.keys(categoryMostOccurringData);
          const conditionsData = {};
          categoryIds.forEach((categoryId) => {
            const mostOccurringData = categoryMostOccurringData[categoryId];
            const sortedResults = Object.keys(mostOccurringData).sort(
              (a, b) =>
                mostOccurringData[b].percentage -
                mostOccurringData[a].percentage
            );

            let conditions = "";
            const highestPercentage =
              mostOccurringData[sortedResults[0]].percentage;
            sortedResults.forEach((resultName, index) => {
              if (
                Math.abs(
                  mostOccurringData[resultName].percentage - highestPercentage
                ) <= MARGIN
              ) {
                conditions += index === 0 ? resultName : `, ${resultName}`;
              }
            });

            conditionsData[categoryId] = conditions;
          });

          setConditions(conditionsData);

          // Fetch data based on conditions
          const topicCodes = Object.values(conditionsData);
          axios
            .get(
              `http://localhost:3001/api/qna/get/first/topic/${JSON.stringify(
                topicCodes
              )}`
            )
            .then((response) => {
              const data = response.data;
              setResult(data.topics);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [user]);

  const containerStyle = {
    marginLeft: isMobile ? 0 : 50,
    transition: "margin 0.5s",
    display: "flex",
    marginTop: 75,
  };

  return (
    <div style={containerStyle}>
      <DemoPaper square={false} elevation={12}>
        <PerfectScrollbar options={{ wheelPropagation: false }}>
          {result ? (
            result.map((topic, index) => (
              <Box key={index}>
                <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
                  {topic.topicHeading}
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
                    __html: topic.topicDescription,
                  }}
                />
                <img
                  width="60%"
                  height="50%"
                  src={topic.topicImage}
                  alt="preview"
                  style={{ marginTop: isMobile ? "8px" : "16px" }}
                />
              </Box>
            ))
          ) : (
            <Typography variant={isMobile ? "body2" : "body1"}>
              Loading...
            </Typography>
          )}
        </PerfectScrollbar>
      </DemoPaper>
    </div>
  );
};

export default Report;
