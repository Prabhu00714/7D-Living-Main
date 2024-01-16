import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const Users = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const containerStyle = {
    marginLeft: isMobile ? 0 : 400,
    transition: "margin 0.5s",
    position: "absolute",
    top: 80,
  };

  return <div style={containerStyle}>Users</div>;
};

export default Users;