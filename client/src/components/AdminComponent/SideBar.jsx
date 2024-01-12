/* eslint-disable no-unused-vars */
import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SideBarList from "./SideBarList";
import Divider from "@mui/material/Divider";

const SideBar = ({
  onSelectCategory,
  isMobile,
  isMobileDrawerOpen,
  setMobileDrawerOpen,
  toggleMobileDrawer,
  getCategory,
}) => {
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
          <Divider />
          <SideBarList
            onSelectCategory={(category) => {
              onSelectCategory(category);
            }}
            getCategory={getCategory}
          />
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
          <Box
            sx={{
              p: 2,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
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
              }}
            >
              LIVING
            </Typography>
          </Box>
          <Divider />
          <SideBarList
            onSelectCategory={(category) => {
              onSelectCategory(category);
              setMobileDrawerOpen(false);
            }}
            getCategory={getCategory}
          />

          <IconButton
            sx={{ position: "absolute", top: 5, right: 5 }}
            onClick={toggleMobileDrawer}
          >
            <CloseIcon />
          </IconButton>
        </Drawer>
      )}
    </React.Fragment>
  );
};

export default SideBar;
