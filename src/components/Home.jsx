/* eslint-disable no-unused-vars */
// Home.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <img
        className="background-image"
        src={`${process.env.PUBLIC_URL}/images/background.jpg`}
        alt="Background"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      Welcome to the Homepage!
      <Link to="/login" style={{ textDecoration: "none" }}>
        <button>Login</button>
      </Link>
    </motion.div>
  );
};

export default Home;
