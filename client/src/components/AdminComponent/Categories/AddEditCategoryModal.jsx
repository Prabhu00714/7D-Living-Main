/* eslint-disable react-hooks/exhaustive-deps */
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddEditCategoriesModal = ({ state, dispatch, onAddItem, isMobile }) => {
  const [formData, setFormData] = useState({
    header: "",
    description: "",
    image: null,
  });

  const handleClose = () => {
    dispatch({ type: "set_category_modal", payload: false });
    setFormData({
      header: "",
      description: "",
      image: null,
    });
    dispatch({ type: "set_category_action", payload: "" });
    dispatch({ type: "set_model_type", payload: null });
    dispatch({ type: "set_model_name", payload: null });
  };

  const handleAdd = async () => {
    try {
      if (!formData.header || !formData.description) {
        toast.error("Both header and description are required");
        return;
      }

      let apiEndpoint;

      switch (state.modelType) {
        case "categoryGroup":
          apiEndpoint = "http://localhost:3001/api/qna/post/new/categorygroup";
          break;
        case "category":
          apiEndpoint = `http://localhost:3001/api/qna/post/new/category/${state.selectedCategoryGroupItem._id}`;
          break;
        case "subCategory":
          apiEndpoint = `http://localhost:3001/api/qna/post/new/subcategory/${state.selectedCategoryItem._id}`;
          break;
        default:
          throw new Error("Invalid category action");
      }

      const requestData = {
        header: formData.header,
        description: formData.description,
        image: formData.image,
        categoryId:
          state.modelType === "category" ? state.selectedItemId : undefined,
        subCategoryId:
          state.modelType === "subCategory" ? state.selectedItemId : undefined,
      };

      const response = await axios.post(apiEndpoint, requestData);

      if (response.status === 200) {
        toast.success(`${state.modelName} Added Successfully`);
        setFormData({
          header: "",
          description: "",
          image: null,
        });
        dispatch({ type: "set_category_action", payload: "" });
        dispatch({ type: "set_model_type", payload: null });
        dispatch({ type: "set_model_name", payload: null });
      } else {
        toast.error("Please fill all fields!!!");
      }
      onAddItem(state.modelType);
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = async () => {
    try {
      if (!formData.header || !formData.description) {
        toast.error("Both header and description are required");
        return;
      }

      let selectedItemId;

      switch (state.modelType) {
        case "categoryGroup":
          selectedItemId = state.selectedCategoryGroupItem._id;
          break;
        case "category":
          selectedItemId = state.selectedCategoryItem._id;
          break;
        case "subCategory":
          selectedItemId = state.selectedSubCategoryItem._id;
          break;
        default:
          break;
      }

      const requestData = {
        header: formData.header,
        description: formData.description,
        image: formData.image,
      };
      // const cacheBuster = new Date().getTime();
      // `http://localhost:3001/api/qna/post/edit/${state.modelType}/${selectedItemId}?_=${cacheBuster}`,

      const response = await axios.post(
        `http://localhost:3001/api/qna/post/edit/${state.modelType}/${selectedItemId}`,
        requestData
      );

      if (response.status === 200) {
        toast.success(`${state.modelName} Edited Successfully`);
        setFormData({
          header: "",
          description: "",
          image: null,
        });
        dispatch({ type: "set_category_action", payload: "" });
        dispatch({ type: "set_model_type", payload: null });
        dispatch({ type: "set_model_name", payload: null });
      } else {
        toast.error("Failed to edit. Please fill all fields!!!");
      }

      onAddItem(state.modelType);
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getModelData = () => {
    switch (state.modelType) {
      case "categoryGroup":
        return {
          headingKey: "categoryGroupHeading",
          descriptionKey: "categoryGroupDescription",
        };
      case "category":
        return {
          headingKey: "categoryHeading",
          descriptionKey: "categoryDescription",
        };
      case "subCategory":
        return {
          headingKey: "subCategoryHeading",
          descriptionKey: "subCategoryDescription",
        };
      default:
        return {};
    }
  };

  const { headingKey, descriptionKey } = getModelData();

  useEffect(() => {
    if (state.categoryAction === "add" && state.modelType) {
      console.log("if");
      setFormData({
        header: "",
        description: "",
        image: null,
      });
    } else if (state.categoryAction === "edit" && state.modelType) {
      let selectedItemId;

      switch (state.modelType) {
        case "categoryGroup":
          selectedItemId = state.selectedCategoryGroupItem._id;
          break;
        case "category":
          selectedItemId = state.selectedCategoryItem._id;
          break;
        case "subCategory":
          selectedItemId = state.selectedSubCategoryItem._id;
          break;
        default:
          break;
      }

      if (selectedItemId) {
        axios
          .get(
            `http://localhost:3001/api/qna/get/edit/${state.modelType}/${selectedItemId}`
          )
          .then((response) => {
            const data = response.data;
            setFormData({
              header: data[headingKey],
              description: data[descriptionKey],
              image: data.image || null,
            });
          })
          .catch((error) => console.error("Error fetching data:", error));
      }
    }
  }, [state.categoryAction, state.modelType]);

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

  const handleQuillChange = (value) => {
    setFormData({ ...formData, description: value });
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

          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={handleQuillChange}
            modules={{
              toolbar: [
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
              ],
            }}
          />
          {/* <TextField
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
          /> */}

          {/* File Input */}
          <input
            type="file"
            id="image"
            accept="image/*"
            style={{ margin: "auto", display: "block", marginTop: "8px" }}
            onChange={handleImageChange}
          />
        </DialogContent>
        <Divider />

        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={state.categoryAction === "add" ? handleAdd : handleEdit}
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
