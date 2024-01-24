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

const AddEditTopicModal = ({ state, dispatch, onAddItem, isMobile }) => {
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;

    dispatch({ type: "set_topic_modal", payload: false });
    setHeader("");
    setDescription("");
    setImage(null);
    dispatch({ type: "set_topic_action", payload: "" });
  };

  const handleAdd = async () => {
    try {
      if (!header || !description) {
        toast.error("Both header and description are required");
        return;
      }

      const requestData = {
        header,
        description,
        image,
      };

      const response = await axios.post(
        "http://localhost:3001/api/qna/post/new/topic",
        requestData
      );
      console.log("response.status", response.status);

      if (response.status === 200) {
        console.log("response.status");
        toast.success(`New Topic Added Successfully`);
        setHeader("");
        setDescription("");
        setImage(null);
        dispatch({ type: "set_topic_action", payload: "" });
      } else {
        toast.error("Please fill all fields!!!");
      }
      onAddItem("topic");
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = async () => {
    try {
      console.log("state.selectedTopicItem", state.selectedTopicItem);
      if (!header || !description) {
        toast.error("Both header and description are required");
        return;
      }

      const requestData = {
        header,
        description,
        image,
      };

      const response = await axios.post(
        `http://localhost:3001/api/qna/post/edit/topic/${state.selectedTopicItem._id}`,
        requestData
      );

      if (response.status === 200) {
        toast.success(`Topic Edited Successfully`);
        setHeader("");
        setDescription("");
        setImage(null);
        dispatch({ type: "set_topic_action", payload: "" });
      } else {
        toast.error("Failed to edit. Please fill all fields!!!");
      }

      onAddItem("topic");
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (state.topicAction === "add") {
      setHeader("");
      setDescription("");
      setImage(null);
    } else if (state.topicAction === "edit") {
      console.log("selectedTopicItem", state.selectedTopicItem);
      if (state.selectedTopicItem) {
        axios
          .get(
            `http://localhost:3001/api/qna/get/edit/topic/${state.selectedTopicItem._id}`
          )
          .then((response) => {
            const data = response.data;
            console.log("data", data);
            setHeader(data.header);
            setDescription(data.description);
            setImage(data.image || null);
          })
          .catch((error) => console.error("Error fetching data:", error));
      }
    }
  }, [state.selectedTopicItem]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuillChange = (value) => {
    setDescription(value);
  };

  return (
    <>
      <Dialog
        open={state.topicModal}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
      >
        {/* Header */}
        <DialogTitle>
          {state.topicAction === "add" ? `Add New Topic` : "Edit Item"}
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
            value={header}
            onChange={(e) => setHeader(e.target.value)}
          />

          <ReactQuill
            theme="snow"
            value={description}
            onChange={handleQuillChange}
            modules={{
              toolbar: [
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
              ],
            }}
          />

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
            onClick={state.topicAction === "add" ? handleAdd : handleEdit}
            startIcon={
              state.topicAction === "add" ? <SaveIcon /> : <BorderColorIcon />
            }
          >
            {state.topicAction === "add" ? "Add" : "Edit"}
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

export default AddEditTopicModal;
