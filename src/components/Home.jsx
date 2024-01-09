// Home.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "./HomeComponent/TopBar";
import SideBar from "./HomeComponent/SideBar";
import CategorySelected from "./HomeComponent/CategorySelected";

const Home = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedComponent(category);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <TopBar />
      <SideBar onSelectCategory={handleCategorySelect} />
      <div>
        {/* Render component based on selected category */}
        {selectedComponent && (
          <CategorySelected selectedComponent={selectedComponent} />
        )}
      </div>
    </motion.div>
  );
};

export default Home;
