/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import TextField from "@mui/material/TextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  Button,
  Link,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useMediaQuery from "@mui/material/useMediaQuery";

const Login = () => {
  const { login } = useAuth(); // useAuth hook
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleSignUpGoogle = () => {
    console.log();
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/loginsignup/existing/user",
        {
          email: email,
          password,
        }
      );

      if (response.status === 200) {
        const userData = { username: email };
        login(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        if (email === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid username or password");
      } else {
        console.error(error);
        toast.error("Error logging in");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
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
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Paper
          elevation={24}
          sx={{
            padding: "50px",
            textAlign: "center",
            position: "relative",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
            color: "#FFF",
          }}
        >
          <Avatar
            alt="Logo"
            src={`${process.env.PUBLIC_URL}/images/Logo.png`}
            sx={{
              width: 100,
              height: 100,
              position: "absolute",
              top: "15px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
          <Typography
            variant="h3"
            component="div"
            sx={{ marginTop: "70px", fontFamily: "Sans serif fonts" }}
          >
            Welcome
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: "white" }}>
                    <MailIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: "white" } }}
              autoComplete="off"
              sx={{
                "& input": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  borderColor: "white",
                  "& fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: "white" }}>
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end" sx={{ color: "white" }}>
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: "white" } }}
              autoComplete="off"
              sx={{
                "& input": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  borderColor: "white",
                  "& fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 3,
              mb: -5,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSignUp}
              sx={{
                borderRadius: 28,
                backgroundColor: "white",
                color: "black",
                fontSize: "1rem",
                padding: "9px 18px",
                "&:hover": {
                  backgroundColor: "white",
                },
                mt: -1,
              }}
            >
              Sign Up
            </Button>
            <Divider
              orientation="horizontal"
              flexItem
              sx={{
                backgroundColor: "white",
                height: "2px",
                margin: "18px 0",
              }}
            />{" "}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSignUpGoogle}
              sx={{
                backgroundColor: "white",
                color: "black",
                fontSize: "1rem",
                padding: "10px 20px",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/google.png`}
                alt="Google Icon"
                style={{
                  width: "30px",
                  height: "30px",
                  marginRight: "10px",
                  borderRadius: "50%",
                }}
              />
              Sign in with Google
            </Button>
            <Typography
              variant="body2"
              sx={{ color: "white", mt: 1, alignItems: "center" }}
            >
              Don't have an account?{" "}
              <Link
                component="button"
                variant="body2"
                onClick={handleSignupClick}
                style={{
                  cursor: "pointer",
                  color: "white",
                  textDecoration: "underline",
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
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

export default Login;
