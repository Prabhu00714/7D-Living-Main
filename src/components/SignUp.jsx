// SignUp.jsx
import React, { useEffect, useReducer } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import Logo from "../assets/Logo.png";
import BackgroundImage from "../assets/background.jpg";
import { ToastContainer, toast } from "react-toastify";
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

export default function SignUp() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Pre-load the background image
    const img = new Image();
    img.src = BackgroundImage;
  }, []);

  return (
    <>
      <img
        className="background-image"
        src={BackgroundImage}
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
          marginLeft: isMobile ? 10 : "",
          width: "80%",
          maxWidth: isMobile ? "300px" : "600px",
          marginTop: isMobile ? 6 : "8px",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Darken the background color
          backdropFilter: "blur(10px)", // Add blur effect
          color: "#FFF", // Set text color to white
        }}
      >
        <Avatar
          alt="Logo"
          src={Logo}
          sx={{ width: 100, height: 100, margin: "auto" }}
        ></Avatar>
        <Typography
          variant="h5"
          component="div"
          sx={{ marginBottom: isMobile ? "10px" : "20px" }}
        >
          Sign Up
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
    </>
  );
}
