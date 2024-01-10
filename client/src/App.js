/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./components/LogInOut/Login";
import Home from "./components/Home";
import SignUp from "./components/SignUp/SignUp";
import CustomScrollbar from "react-custom-scrollbars";
import Admin from "./components/Admin";
import Welcome from "./components/Welcome";
import { useAuth } from "./AuthContext";
import LogOut from "./components/LogInOut/LogOut";

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function App() {
  const { login } = useAuth();

  useEffect(() => {
    // Check if there's an existing user in local storage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        login(userData);
      } catch (error) {
        // Handle the error (e.g., log it, ignore it, or take appropriate action)
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  return (
    <div>
      <CustomScrollbar style={{ width: "100%", height: "100vh" }}>
        <AnimatePresence>
          <Routes>
            {/* Welcome route */}
            <Route
              exact
              path="/welcome"
              element={
                <motion.div {...pageTransition}>
                  <div>
                    <Welcome />
                  </div>
                </motion.div>
              }
            />

            {/* Home route */}
            <Route
              path="/home"
              element={
                <motion.div {...pageTransition}>
                  <Home />
                </motion.div>
              }
            />

            {/* Login route */}
            <Route
              path="/login"
              element={
                <motion.div {...pageTransition}>
                  <Login />
                </motion.div>
              }
            />

            {/* SignUp route */}
            <Route
              path="/signup"
              element={
                <motion.div {...pageTransition}>
                  <SignUp />
                </motion.div>
              }
            />

            {/* LogOut route */}
            <Route
              path="/logout"
              element={
                <motion.div {...pageTransition}>
                  <LogOut />
                </motion.div>
              }
            />

            {/* Admin route */}
            <Route
              path="/admin"
              element={
                <motion.div {...pageTransition}>
                  <Admin />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </CustomScrollbar>
    </div>
  );
}

export default App;
