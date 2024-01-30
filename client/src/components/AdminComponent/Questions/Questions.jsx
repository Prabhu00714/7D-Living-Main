/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "axios";
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

const Questions = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const containerStyle = {
    marginLeft: isMobile ? 30 : 250,
    transition: "margin 0.5s",
    display: "flex",
    marginTop: 75,
  };

  return (
    <div style={containerStyle}>
      <DemoPaper square={false} elevation={12}>
        <PerfectScrollbar options={{ wheelPropagation: false }}>
          rdghtr
        </PerfectScrollbar>
      </DemoPaper>
    </div>
  );
};

export default Questions;
