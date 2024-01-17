import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";

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
      <Divider />

      <DialogContent>
        {/* Your form or content goes here */}
        <List>
          {/* List items with checkboxes */}
          <ListItem>
            <FormControlLabel
              control={<Checkbox />}
              label="Option 1"
              // You can handle the state of the checkboxes here
              // e.g., checked={state.option1Checked}
              // onChange={() => handleCheckboxChange("option1")}
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={<Checkbox />}
              label="Option 2"
              // You can handle the state of the checkboxes here
              // e.g., checked={state.option2Checked}
              // onChange={() => handleCheckboxChange("option2")}
            />
          </ListItem>
          {/* Add more list items as needed */}
        </List>
      </DialogContent>

      <Divider />

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
