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
import { IconButton, InputAdornment, Button, Link } from "@mui/material";
import Image from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion components
import BackgroundImage from "../assets/background.jpg";
import GoogleIcon from "../assets/google.png";

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

  const handleSignUp = () => {
    console.log();
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
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
            src={Image}
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
            Login
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
                backgroundColor: "white",
                color: "black",
                fontSize: "1rem", // Adjust the font size as needed
                padding: "10px 20px", // Adjust the padding to increase the button size
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
            >
              <img
                src={GoogleIcon} // Replace with the actual path to your image
                alt="Google Icon"
                style={{
                  width: "30px",
                  height: "30px",
                  marginRight: "10px",
                  borderRadius: "50%",
                }} // Adjust width and height as needed
              />
              Sign Up with Google
            </Button>
            <Typography
              variant="body2"
              sx={{ color: "white", mt: 1, alignItems: "center" }}
            >
              Or sign up with{" "}
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
                Email
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </motion.div>
  );
}
