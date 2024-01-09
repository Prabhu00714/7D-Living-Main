// Header.jsx
import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { IconButton, List } from "@mui/material";
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
  height: "55px", // Set your desired height for PC
  "@media (max-width: 600px)": {
    height: "40px", // Adjust for mobile view
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
    <div>
      <div style={{ position: "absolute", top: 0, right: 40 }}>
        <IconButton
          id="avatar-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          size="large"
          disableTouchRipple // Disable ripple effect on touch
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
          <AccountCircleIcon sx={{ color: "black", width: 40, height: 40 }} />
        </IconButton>

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
              <ResponsiveMenuItem onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </ResponsiveMenuItem>
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
      </div>
    </div>
  );
};

export default Header;
