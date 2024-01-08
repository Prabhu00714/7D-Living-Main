// AddCategoryModal.jsx
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
        <Button onClick={onSave}>Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Box>
    </Modal>
  );
};

export default AddCategoryModal;
