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
  const [conditions, setConditions] = useState("");

  useEffect(() => {
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
  }, [conditions]);

  const handleConditions = () => {
    if (
      aggregatedResults.results &&
      aggregatedResults.results.V > aggregatedResults.results.P &&
      aggregatedResults.results.V > aggregatedResults.results.K
    ) {
      setConditions("V");
    } else if (
      aggregatedResults.results &&
      aggregatedResults.results.P > aggregatedResults.results.V &&
      aggregatedResults.results.P > aggregatedResults.results.K
    ) {
      setConditions("P");
    } else if (
      aggregatedResults.results &&
      aggregatedResults.results.K > aggregatedResults.results.V &&
      aggregatedResults.results.K > aggregatedResults.results.P
    ) {
      setConditions("K");
    }
  };

  useEffect(() => {
    if (user) {
      console.log("user.username", user.username);

      axios
        .get(
          `http://localhost:3001/api/qna/get/aggregatedResults/${user.username}`
        )
        .then((response) => {
          const data = response.data;
          setAggregatedResults(data);
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
          <Typography variant="h6" style={{ marginBottom: 8 }}>
            Header: {result.header}
          </Typography>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: result.description }}
          />
          <img
            width={isMobile ? "80%" : "60%"}
            height="auto"
            src={result.image}
            alt="answer image"
            style={{ marginTop: "16px" }}
          />
        </PerfectScrollbar>
      </DemoPaper>
    </div>
  );
};

export default Report;
