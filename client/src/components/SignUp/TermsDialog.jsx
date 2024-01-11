/* eslint-disable no-unused-vars */
import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

const TermsDialog = ({ isOpen, handleClose }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Terms of Service</DialogTitle>
      <DialogContent>
        {/* Add your Terms of Service text here */}
        <p>This is the Terms of Service text.</p>
      </DialogContent>
    </Dialog>
  );
};

export default TermsDialog;
