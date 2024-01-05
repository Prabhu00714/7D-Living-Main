// BasicMenu.jsx
import React from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const BasicMenu = ({ user, login, logout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>{user.username}</MenuItem>
        <MenuItem onClick={handleAction}>My account</MenuItem>
        <MenuItem onClick={handleAction}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default BasicMenu;

{/* <button onClick={logout}>Logout</button> */ }
                      {/* <Link to="/login">Login</Link> */}
