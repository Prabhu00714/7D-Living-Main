import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AppDrawerContent from "./AppDrawerContent"; // Your existing drawer content component
import Divider from "@mui/material/Divider";

const MobileAppDrawer = ({ isOpen, toggleDrawer }) => {
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={toggleDrawer}
      variant="temporary"
    >
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Your logo and text content */}
        <img
          src={`${process.env.PUBLIC_URL}/images/Logo.png`}
          alt="Logo"
          style={{ width: 60, height: 60, marginBottom: 10 }}
        />
        <Typography
          variant="h4"
          sx={{
            fontFamily: "stencil",
            fontStyle: "italic",
            fontWeight: "bold",
            color: "yourColor",
          }}
        >
          LIVING
        </Typography>
      </Box>

      {/* Divider */}
      <Divider />

      {/* Category List */}
      <AppDrawerContent />

      {/* Close button for mobile */}
      <IconButton
        sx={{ position: "absolute", top: 5, right: 5 }}
        onClick={toggleDrawer}
      >
        <CloseIcon />
      </IconButton>
    </Drawer>
  );
};

export default MobileAppDrawer;
