/* eslint-disable no-unused-vars */
import React from "react";
import { useAuth } from "../../AuthContext";

const LogOut = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};
export default LogOut;
