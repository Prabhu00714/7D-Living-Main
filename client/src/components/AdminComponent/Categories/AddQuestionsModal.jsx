import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const AddQuestionsModal = ({ state, dispatch }) => {
  const handleClose = () => {
    dispatch({ type: "set_question_modal", payload: false });
  };

  const handleSubmit = () => {
    // Implement your logic for handling the form submission (add or edit)
    handleClose(); // Close the modal after handling the submission
  };

  return (
    <Dialog
      open={state.questionModal}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Title</DialogTitle>
      <DialogContent>{/* Your form or content goes here */}</DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddQuestionsModal;
