// Header.jsx
import React, { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { IconButton, List } from "@mui/material";
import { styled } from '@mui/system';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

// Styled components for responsive styling
const ResponsiveMenu = styled(Menu)({
  width: '250px', // Set your desired width for PC
  '@media (max-width: 600px)': {
    width: '150px', // Adjust for mobile view
  },
});

const ResponsiveMenuItem = styled(MenuItem)({
  height: '55px', // Set your desired height for PC
  '@media (max-width: 600px)': {
    height: '40px', // Adjust for mobile view
  },
});

const Header = () => {
  const { user, login, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = () => {
    handleClose();
  };

  return (
    <div>
    <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <IconButton
            id="avatar-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            size="large"
            disableTouchRipple // Disable ripple effect on touch
            sx={{
                color: "white",
                width: 150,
                height: 'auto',
                '&:hover': {
                backgroundColor: 'transparent',
                },
                '&:focus': {
                backgroundColor: 'transparent',
                },
            }}
            >
            <AccountCircleIcon sx={{ color: "white", width: 40, height: 40 }} />
            </IconButton>


        <ResponsiveMenu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'avatar-button',
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          getContentAnchorEl={null}
        >
          {user ? (
            <>
              <ResponsiveMenuItem>
                <List>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  {user.username}
                </List>
              </ResponsiveMenuItem>
              <ResponsiveMenuItem onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </ResponsiveMenuItem>
            </>
          ) : (
            <ResponsiveMenuItem>
              <Link to="/login" onClick={handleClose} sx={{color: 'white'}}>
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                Login
              </Link>
            </ResponsiveMenuItem>
          )}
        </ResponsiveMenu>
      </div>
    </div>
  );
};

export default Header;
