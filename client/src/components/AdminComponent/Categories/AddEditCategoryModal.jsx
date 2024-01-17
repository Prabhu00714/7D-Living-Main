import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useMediaQuery from "@mui/material/useMediaQuery";

const AddEditCategoriesModal = ({ state, dispatch }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [formData, setFormData] = useState({
    header: "",
    description: "",
    image: null,
  });

  const handleClose = () => {
    dispatch({ type: "set_category_modal", payload: false });
  };

  const handleConfirmation = async () => {
    try {
      if (!formData.header || !formData.description) {
        toast.error("Both header and description are required");
        return;
      }

      const response = await axios.post(
        `http://localhost:3001/api/qna/post/new/${state.modelType}`,
        {
          header: formData.header,
          description: formData.description,
          image: formData.image,
        }
      );

      if (response.status === 200) {
        toast.success(`${state.modelName} Added Successfully`);
        setFormData({ header: "", description: "", image: null });
      } else {
        toast.error("Please fill all fields!!!");
      }

      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getModelData = () => {
    switch (state.modelType) {
      case "category":
        return {
          headingKey: "categoryHeading",
          descriptionKey: "categoryDescription",
          imageKey: "categoryImage",
        };
      case "categoryGroup":
        return {
          headingKey: "categoryGroupHeading",
          descriptionKey: "categoryGroupDescription",
          imageKey: "categoryGroupImage",
        };
      case "subCategory":
        return {
          headingKey: "subCategoryHeading",
          descriptionKey: "subCategoryDescription",
          imageKey: "subCategoryImage",
        };
      default:
        return {};
    }
  };

  const { headingKey, descriptionKey } = getModelData();

  useEffect(() => {
    // Initialize formData when adding a new item
    if (state.categoryAction === "add" && state.modelType) {
      setFormData({
        header: "",
        description: "",
        image: null,
      });
    } else if (state.categoryAction === "edit" && state.modelType) {
      axios
        .get(`/api/${state.modelType}/${state.selectedItemId}`)
        .then((response) => {
          const data = response.data;
          setFormData({
            header: data[headingKey] || "",
            description: data[descriptionKey] || "",
            image: data.image || null,
          });
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [
    state.categoryAction,
    state.modelType,
    state.selectedItemId,
    headingKey,
    descriptionKey,
  ]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Dialog
        open={state.categoryModal}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
      >
        {/* Header */}
        <DialogTitle>
          {state.categoryAction === "add"
            ? `Add New ${state.modelName}`
            : "Edit Item"}
        </DialogTitle>

        {/* Divider above Body */}
        <Divider />

        {/* Body */}
        <DialogContent>
          {/* Text Fields for Header and Description */}
          <TextField
            autoFocus
            margin="dense"
            id="header"
            label="Header"
            type="text"
            fullWidth
            value={formData.header}
            onChange={(e) =>
              setFormData({ ...formData, header: e.target.value })
            }
          />
          <TextField
            multiline
            rows={4}
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            sx={{ mt: 2, mb: 2 }}
          />

          {/* File Input */}
          <input
            type="file"
            id="image"
            accept="image/*"
            style={{ margin: "auto", display: "block" }}
            onChange={handleImageChange}
          />
        </DialogContent>
        <Divider />

        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleConfirmation}
            startIcon={
              state.categoryAction === "add" ? (
                <SaveIcon />
              ) : (
                <BorderColorIcon />
              )
            }
          >
            {state.categoryAction === "add" ? "Add" : "Edit"}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClose}
            startIcon={<CloseIcon />}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer
        position={isMobile ? "top-center" : "top-right"}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default AddEditCategoriesModal;
