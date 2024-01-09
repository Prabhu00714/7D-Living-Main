import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CategoryList from "./CategoryList";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";

const SideBar = () => {
  const [isMobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!isMobileDrawerOpen);
  };

  return (
    <React.Fragment>
      {/* Permanent Drawer for PC */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{ width: 250, flexShrink: 0 }}
        >
          <Box
            sx={{
              p: 1,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
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
                ml: 2,
                mt: -2,
              }}
            >
              LIVING
            </Typography>
          </Box>

          {/* Divider */}
          <Divider />

          {/* Category List */}
          <CategoryList />
        </Drawer>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={isMobileDrawerOpen}
          onClose={toggleMobileDrawer}
          variant="temporary"
        >
          {/* Content for mobile drawer */}
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

          <Divider />

          <CategoryList />

          <IconButton
            sx={{ position: "absolute", top: 5, right: 5 }}
            onClick={toggleMobileDrawer}
          >
            <CloseIcon />
          </IconButton>
        </Drawer>
      )}

      {/* Button to open mobile drawer on PC */}
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
    </React.Fragment>
  );
};

export default SideBar;
