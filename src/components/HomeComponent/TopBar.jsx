/* eslint-disable no-unused-vars */
// TopBar.jsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import Header from "../LogInOut/Header";
import IconButton from "@mui/material/IconButton";

function TopBar({ isMobile, isMobileDrawerOpen, toggleMobileDrawer }) {
  return (
    <AppBar
      position="fixed"
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
          {isMobile && !isMobileDrawerOpen && (
            <IconButton
              sx={{
                position: "fixed",
                top: 10,
                left: 10,
                zIndex: 1,
              }}
              onClick={toggleMobileDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopBar;
