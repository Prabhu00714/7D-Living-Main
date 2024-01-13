/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TopBar from "./HomeComponent/TopBar";
import SideBar from "./HomeComponent/SideBar";
import ListSelectedCategory from "./HomeComponent/ListSelectedCategory";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [isMobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedComponent(category);
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!isMobileDrawerOpen);
  };

  useEffect(() => {
    // Show the toast message only if neither newCategory nor selectedComponent is true
    if (!selectedComponent) {
      toast.info("Please select any one option !!!");
    }
  }, [selectedComponent, isMobile]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <TopBar
        isMobile={isMobile}
        isMobileDrawerOpen={isMobileDrawerOpen}
        toggleMobileDrawer={toggleMobileDrawer}
      />
      <SideBar
        onSelectCategory={handleCategorySelect}
        isMobile={isMobile}
        isMobileDrawerOpen={isMobileDrawerOpen}
        setMobileDrawerOpen={setMobileDrawerOpen}
        toggleMobileDrawer={toggleMobileDrawer}
      />
      <div>
        {/* Render component based on selected category */}
        {selectedComponent && (
          <ListSelectedCategory selectedComponent={selectedComponent} />
        )}
      </div>
      <ToastContainer
        position={isMobile ? "top-center" : "top-right"}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </motion.div>
  );
};

export default Home;
