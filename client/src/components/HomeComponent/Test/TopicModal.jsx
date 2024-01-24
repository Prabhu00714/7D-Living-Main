import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../../AuthContext";

const TopicModal = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [open, setOpen] = useState(true);
  const [aggregatedResults, setAggregatedResults] = useState([]);
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [resultsSummary, setResultsSummary] = useState({});
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/qna/get/first/topic")
      .then((response) => {
        const data = response.data;
        setHeader(data.topicHeading);
        setDescription(data.topicDescription);
        setImage(data.topicImage);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/qna/get/aggregatedResults/${user.username}`
      )
      .then((response) => {
        const data = response.data;
        setAggregatedResults(data);

        // Calculate the summary of results
        const summary = data.reduce((acc, result) => {
          const { resultName, totalScore } = result;

          // Initialize or update the summary
          acc.results = acc.results || {};
          acc.scores = acc.scores || {};

          // Update resultName count
          acc.results[resultName] = (acc.results[resultName] || 0) + 1;

          // Update totalScore sum
          acc.scores[resultName] = (acc.scores[resultName] || 0) + totalScore;

          return acc;
        }, {});

        setResultsSummary(summary);

        // Define conditions based on the aggregated results
        const newConditions = [];

        // Example condition: V > P and V > K
        if (
          summary.results &&
          summary.results.V > summary.results.P &&
          summary.results.V > summary.results.K
        ) {
          newConditions.push("V > P and V > K");
        }

        // Add more conditions as needed

        setConditions(newConditions);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [user.username]);

  const handleClose = () => {
    navigate("/home");
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableBackdropClick={true}
      maxWidth={isMobile ? "sm" : "sm"}
    >
      <DialogContent>
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: 8,
            textAlign: "center",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" style={{ marginBottom: 8 }}>
            Header: {header}
          </Typography>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <img
            width={isMobile ? "80%" : "60%"}
            height="auto"
            src={image}
            alt="answer image"
            style={{ marginTop: "16px" }}
          />
          <Button
            variant="contained"
            color="default"
            onClick={handleClose}
            style={{ marginTop: 16 }}
          >
            Close
          </Button>

          {/* Display the results summary */}
          <div style={{ marginTop: 16 }}>
            <Typography variant="h6">Results Summary:</Typography>
            <ul>
              {Object.keys(resultsSummary.results || {}).map(
                (resultName, index) => (
                  <li key={index}>
                    {resultName}: Count - {resultsSummary.results[resultName]},
                    Total Score - {resultsSummary.scores[resultName]}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Display the conditions */}
          <div style={{ marginTop: 16 }}>
            <Typography variant="h6">Conditions:</Typography>
            <ul>
              {conditions.map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TopicModal;
