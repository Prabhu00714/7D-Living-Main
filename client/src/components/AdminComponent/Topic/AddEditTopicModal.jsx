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
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;

    dispatch({ type: "set_topic_modal", payload: false });
    setPrompt("");
    setCode("");
    setHeader("");
    setDescription("");
    setImage(null);
    dispatch({ type: "set_topic_action", payload: "" });
  };

  const handleAdd = async () => {
    try {
      if (!header || !description || !code) {
        toast.error("Both header and description are required");
        return;
      }

      const requestData = {
        prompt,
        code,
        header,
        description,
        image,
      };

      const response = await axios.post(
        "http://localhost:3001/api/qna/post/new/topic",
        requestData
      );

      if (response.status === 200) {
        toast.success(`New Topic Added Successfully`);
        setPrompt("");
        setCode("");
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
      if (!header || !description || !code) {
        toast.error("Both header and description are required");
        return;
      }

      const requestData = {
        prompt,
        code,
        header,
        description,
        image,
      };

      const response = await axios.post(
        `http://localhost:3001/api/qna/post/topic/edit/${state.selectedTopicItem._id}`,
        requestData
      );

      if (response.status === 200) {
        toast.success(`Topic Edited Successfully`);
        setPrompt("");
        setCode("");
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
      setPrompt("");
      setCode("");
      setHeader("");
      setDescription("");
      setImage(null);
    } else if (state.topicAction === "edit") {
      if (state.selectedTopicItem) {
        axios
          .get(
            `http://localhost:3001/api/qna/get/topic/edit/${state.selectedTopicItem._id}`
          )
          .then((response) => {
            const data = response.data;
            setPrompt(data.prompt);
            setCode(data.topicCode);
            setHeader(data.topicHeading);
            setDescription(data.topicDescription);
            setImage(data.topicImage || null);
          })
          .catch((error) => console.error("Error fetching data:", error));
      }
    }
  }, [state.topicAction, state.selectedTopicItem]);

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
            id="prompt"
            label="Prompt"
            type="text"
            fullWidth
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="code"
            label="Code"
            type="text"
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

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
                [{ header: "1" }, { header: "2" }],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                [{ size: ["small", false, "large", "huge"] }],
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
