import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

const PrivacyDialog = ({ isOpen, handleClose }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Privacy Policy</DialogTitle>
      <DialogContent>
        {/* Add your Privacy Policy text here */}
        <p>This is the Privacy Policy text.</p>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyDialog;
