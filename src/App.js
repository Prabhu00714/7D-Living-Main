/* eslint-disable no-unused-vars */
// App.js
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./components/Login";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import CustomScrollbar from "react-custom-scrollbars";
import Admin from "./components/Admin";

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function App() {
  return (
    <div>
      <CustomScrollbar style={{ width: "100%", height: "100vh" }}>
        {/* Wrap Routes with AnimatePresence */}
        <AnimatePresence>
          <Routes>
            {/* Home route */}
            <Route
              exact
              path="/"
              element={
                <motion.div {...pageTransition}>
                  <div>
                    <Link
                      to="/login"
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        textDecoration: "none",
                      }}
                    >
                      <button>Login</button>
                    </Link>
                    <Home />
                  </div>
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

            {/* SignUp route */}
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
