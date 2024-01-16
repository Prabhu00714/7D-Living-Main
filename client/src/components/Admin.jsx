/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TopBar from "./HomeComponent/TopBar";
import SideBar from "./AdminComponent/SideBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddNewCategory from "./AdminComponent/AddNewCategory";
import UpdateCategory from "./AdminComponent/UpdateCategory";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [newCategory, setNewCategory] = useState("new category");
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [isMobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [getCategory, setGetCategory] = useState("");

  const handleCategorySelect = (category) => {
    if (category === "new category") {
      setNewCategory("new category");
      setSelectedComponent(null);
      setGetCategory(""); // Reset getCategory
    } else {
      setNewCategory(null);
      setGetCategory("");
      setSelectedComponent(category);
    }
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!isMobileDrawerOpen);
  };

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
        getCategory={getCategory}
      />
      <div>
        {newCategory && (
          <AddNewCategory
            getCategory={getCategory}
            setGetCategory={setGetCategory}
          />
        )}
        {selectedComponent && (
          <UpdateCategory
            categoryId={selectedComponent}
            getCategory={getCategory}
            setGetCategory={setGetCategory}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Admin;
