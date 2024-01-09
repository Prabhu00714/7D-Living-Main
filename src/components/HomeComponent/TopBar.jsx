/* eslint-disable no-unused-vars */
// TopBar.jsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Header from "../LogInOut/Header";

function TopBar() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "white",
        height: "60px",
        width: "100%",
        margin: "0 auto",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {/* Add Header Data */}
          </Box>
          <Header />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopBar;
