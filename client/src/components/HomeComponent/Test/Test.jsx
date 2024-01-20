import React from "react";
import { motion } from "framer-motion";
import TopBar from "../TopBar";
import CategoryGroup from "./CategoryGroup";
import { Button } from "@mui/material";

function Test() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <TopBar />
      <CategoryGroup />
      <div
        style={{
          position: "absolute",
          top: "85%",
          left: "80%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <Button variant="outlined"> Add</Button>
      </div>
    </motion.div>
  );
}

export default Test;
