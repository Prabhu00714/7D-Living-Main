import React from "react";
import TopBar from "../HomeComponent/TopBar";
import { motion } from "framer-motion";
import Report from "./Report";

const User = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <TopBar />
      <Report />
    </motion.div>
  );
};

export default User;
