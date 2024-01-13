/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { IconButton, Avatar, Tooltip, Box } from "@mui/material";
import { styled } from "@mui/system";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

const ResponsiveMenu = styled(Menu)({
  width: "250px", // Set your desired width for PC
  "@media (max-width: 600px)": {
    width: "150px", // Adjust for mobile view
  },
});

const ResponsiveMenuItem = styled(MenuItem)({
  height: "40px", // Set your desired height for PC
  "@media (max-width: 600px)": {
    height: "20px", // Adjust for mobile view
  },
});

const Header = () => {
  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        flexGrow: 0,
        position: "fixed",
        right: { xs: 20, sm: 50 }, // Adjust right position based on screen width
        top: "auto",
      }}
    >
      <Tooltip title="Open settings">
        <IconButton
          id="avatar-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          size="large"
          disableTouchRipple
          sx={{
            color: "black",
            width: "auto",
            height: "auto",
            "&:hover": {
              backgroundColor: "transparent",
            },
            "&:focus": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>

      <ResponsiveMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "avatar-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        getContentAnchorEl={null}
      >
        {user ? (
          <>
            <ResponsiveMenuItem>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              {user.username}
            </ResponsiveMenuItem>
            <Link
              to="/"
              onClick={logout}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ResponsiveMenuItem>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </ResponsiveMenuItem>
            </Link>
          </>
        ) : (
          <Link
            to="/login"
            onClick={handleClose}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ResponsiveMenuItem>
              <ListItemIcon>
                <LoginIcon fontSize="small" />
              </ListItemIcon>
              Login
            </ResponsiveMenuItem>
          </Link>
        )}
      </ResponsiveMenu>
    </Box>
  );
};

export default Header;
