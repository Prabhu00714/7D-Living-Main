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
  const [result, setResult] = useState({
    header: "",
    description: "",
    image: "",
  });
  const [mostOccurringResult, setMostOccurringResult] = useState("");

  const [conditions, setConditions] = useState("");

  useEffect(() => {
    if (user) {
      axios
        .get(
          `http://localhost:3001/api/qna/get/aggregatedResults/${user.username}`
        )
        .then((response) => {
          const data = response.data;
          setAggregatedResults(data);

          // Finding the result with the highest total score
          let maxScore = -1;
          let mostOccurring = "";
          for (const result of data) {
            if (result.totalScore > maxScore) {
              maxScore = result.totalScore;
              mostOccurring = result.resultName;
            } else if (result.totalScore === maxScore) {
              mostOccurring += result.resultName;
            }
          }
          setMostOccurringResult(mostOccurring);

          // Handle conditions after setting mostOccurringResult
          if (mostOccurring === "V") {
            setConditions("V");
          } else if (mostOccurring === "P") {
            setConditions("P");
          } else if (mostOccurring === "K") {
            setConditions("K");
          } else if (mostOccurring === "VP" || mostOccurring === "PV") {
            if (mostOccurring === "PV") {
              setConditions("VP");
            } else setConditions("VP");
          } else if (mostOccurring === "VK" || mostOccurring === "KV") {
            if (mostOccurring === "KV") {
              setConditions("VK");
            } else setConditions("VK");
          } else if (mostOccurring === "PK" || mostOccurring === "KP") {
            if (mostOccurring === "KP") {
              setConditions("PK");
            } else setConditions("PK");
          } else if (
            mostOccurring === "VPK" ||
            mostOccurring === "VKP" ||
            mostOccurring === "PVK" ||
            mostOccurring === "PKV" ||
            mostOccurring === "KVP" ||
            mostOccurring === "KPV"
          ) {
            if (
              mostOccurring === "VKP" ||
              mostOccurring === "PVK" ||
              mostOccurring === "PKV" ||
              mostOccurring === "KVP" ||
              mostOccurring === "KPV"
            ) {
              setConditions("VPK");
            } else setConditions("K");
          }

          // Now make the second axios call
          axios
            .get(`http://localhost:3001/api/qna/get/first/topic/${conditions}`)
            .then((response) => {
              const data = response.data;
              setResult({
                header: data.topicHeading,
                description: data.topicDescription,
                image: data.topicImage,
              });
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [user, mostOccurringResult, conditions]);

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
            <Box>
              <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
                {result.header}
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
                  __html: result.description,
                }}
              />
              <img
                width={isMobile ? 250 : 500}
                height={isMobile ? 250 : 500}
                src={result.image}
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
      </DemoPaper>
    </div>
  );
};

export default Report;
