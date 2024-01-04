/* eslint-disable no-unused-vars */
// Login.jsx
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

export default function Login() {
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

  const handleSignUp = () => {
    if (email === "admin" && password === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
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
                padding: "10px 20px",
                "&:hover": {
                  backgroundColor: "white",
                },
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
    </motion.div>
  );
}
