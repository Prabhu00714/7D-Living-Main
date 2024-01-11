/* eslint-disable no-unused-vars */
import React, { useReducer } from "react";
import { motion } from "framer-motion";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpFields from "./SignUpFields";

const initialState = {
  showReenterPassword: false,
  password: "",
  reenterPassword: "",
  showPassword: false,
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SHOW_REENTER_PASSWORD":
      return { ...state, showReenterPassword: !state.showReenterPassword };
    case "TOGGLE_SHOW_PASSWORD":
      return { ...state, showPassword: !state.showPassword };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_REENTER_PASSWORD":
      return { ...state, reenterPassword: action.payload };
    case "SET_FIRST_NAME":
      return { ...state, firstName: action.payload };
    case "SET_LAST_NAME":
      return { ...state, lastName: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PHONE_NUMBER":
      return { ...state, phoneNumber: action.payload };
    default:
      return state;
  }
};

const SignUp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <img
        className="background-image"
        src={`${process.env.PUBLIC_URL}/images/background.jpg`}
        alt="Background"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <CssBaseline />
      <Paper
        elevation={24}
        sx={{
          textAlign: "center",
          padding: isMobile ? "10px" : "20px",
          margin: "auto",
          mb: 2,
          marginLeft: isMobile ? 6 : "",
          width: "80%",
          maxWidth: isMobile ? "300px" : "600px",
          marginTop: isMobile ? 6 : 2,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
          color: "#FFF",
        }}
      >
        <Avatar
          alt="Logo"
          src={`${process.env.PUBLIC_URL}/images/Logo.png`}
          sx={{ width: 100, height: 100, margin: "auto" }}
        />
        <Typography
          variant="h3"
          component="div"
          sx={{
            marginBottom: isMobile ? "10px" : "20px",
            fontFamily: "Sans serif fonts",
          }}
        >
          Create an account
        </Typography>
        <SignUpFields state={state} dispatch={dispatch} isMobile={isMobile} />
      </Paper>
      <ToastContainer
        position={isMobile ? "bottom-center" : "top-right"}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </motion.div>
  );
};

export default SignUp;
