import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

const AddCategoryModal = ({ open, onClose, onSave, onCancel, newCategory, setNewCategory }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="div">
          Add New Category
        </Typography>
        <TextField
          label="Category Name"
          variant="outlined"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <DialogActions>
          <Button onClick={onSave} variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={onCancel} variant="outlined" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};

export default AddCategoryModal;
