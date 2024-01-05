// Admin.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import ListIcon from "@material-ui/icons/List";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState("QuestionForm");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
    setDrawerOpen(false);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Left side drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div>
          <IconButton onClick={() => setDrawerOpen(false)}>
            {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <List>
          <ListItem button onClick={() => handleComponentChange("QuestionForm")}>
            <ListItemIcon>
              <QuestionAnswerIcon />
            </ListItemIcon>
            <ListItemText primary="Question Form" />
          </ListItem>
          <ListItem button onClick={() => handleComponentChange("QuestionList")}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Question List" />
          </ListItem>
          {/* Add more ListItems as needed */}
        </List>
      </Drawer>

      {/* Main content area */}
      <motion.div
        style={{ flex: 1, padding: "20px" }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
          <MenuIcon />
        </IconButton>

        {selectedComponent === "QuestionForm" && <QuestionForm />}
        {selectedComponent === "QuestionList" && <QuestionList />}
        {/* Add more conditions for other components */}
      </motion.div>
    </div>
  );
};

export default Admin;
