import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const AddCategoriesModal = ({ state, dispatch }) => {
  const { categoriesModal, action } = state;

  const handleClose = () => {
    dispatch({ type: "categories_modal_close", payload: false });
  };

  const handleSubmit = () => {
    // Implement your logic for handling the form submission (add or edit)
    handleClose(); // Close the modal after handling the submission
  };

  return (
    <Dialog
      open={categoriesModal}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>{action === "add" ? "Add Item" : "Edit Item"}</DialogTitle>
      <DialogContent>{/* Your form or content goes here */}</DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {action === "add" ? "Add" : "Edit"}
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoriesModal;
