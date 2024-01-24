/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";

const TopicModal = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [open, setOpen] = useState(true);
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    // Make an Axios call to fetch header and description data
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
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TopicModal;
