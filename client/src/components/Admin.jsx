/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TopBar from "./HomeComponent/TopBar";
import SideBar from "./AdminComponent/SideBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import "react-toastify/dist/ReactToastify.css";
import Categories from "./AdminComponent/Categories/Categories";
import QaEditor from "./AdminComponent/QA/QaEditor";
import Topic from "./AdminComponent/Topic/Topic";
import Users from "./AdminComponent/Users";

const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [newCategory, setNewCategory] = useState("new category");
  const [newQna, setNewQna] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [newUsers, setNewUsers] = useState("");
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [isMobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [getCategory, setGetCategory] = useState("");

  const handleCategorySelect = (category) => {
    if (category === "new category") {
      setNewCategory(category);
      // setSelectedComponent(null);
      setGetCategory(""); // Reset getCategory
      setNewQna("");
      setNewUsers("");
      setNewTopic("");
    } else if (category === "new qna") {
      setNewQna(category);
      setNewCategory("");
      setGetCategory("");
      setNewTopic("");
      // setSelectedComponent(category);
      setNewUsers("");
    } else if (category === "new topic") {
      setNewTopic(category);
      setNewQna("");
      setNewCategory("");
      setGetCategory("");
      // setSelectedComponent(category);
      setNewUsers("");
    } else if (category === "new users") {
      setNewUsers(category);
      setNewTopic("");
      setNewQna("");
      setNewCategory("");
      setGetCategory("");
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
      {/* <div>
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
      </div> */}
      <div>
        {newCategory && <Categories />}
        {newQna && <QaEditor />}
        {newTopic && <Topic />}
        {newUsers && <Users />}
      </div>
    </motion.div>
  );
};

export default Admin;
