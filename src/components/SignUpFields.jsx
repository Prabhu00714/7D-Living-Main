// SignUpFields.jsx
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  Grid,
  Divider,
  Box,
  Button,
  Checkbox,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import TermsDialog from "./TermsDialog";
import PrivacyDialog from "./PrivacyDialog";

export default function SignUpFields({ state, dispatch, isMobile }) {
  const navigate = useNavigate();
  const [isTermsDialogOpen, setIsTermsDialogOpen] = useState(false);
  const [isPrivacyDialogOpen, setIsPrivacyDialogOpen] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z0-9]+)*$/;
    const characterLimit = /^.{3,30}$/;
    return nameRegex.test(name) && characterLimit.test(name);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[!@_])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain a special character (@ or _), an uppercase letter (A-Z), a lowercase letter (a-z), and a number (0-9)."
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handlePasswordChange = (e) => {
    validatePassword(e.target.value);
    dispatch({ type: "SET_PASSWORD", payload: e.target.value });
  };
  const handleCheckboxChange = (event) => {
    setIsCheckboxChecked(event.target.checked);
  };

  const handleTermsDialogOpen = () => {
    setIsTermsDialogOpen(true);
  };

  const handlePrivacyDialogOpen = () => {
    setIsPrivacyDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsTermsDialogOpen(false);
    setIsPrivacyDialogOpen(false);
  };

  const handleSignUp = () => {
    if (
      !state.firstName ||
      !state.lastName ||
      !state.email ||
      !state.phoneNumber ||
      !state.password ||
      !state.reenterPassword
    ) {
      toast.error("Please fill in all fields correctly.");
      return;
    }

    if (!validateName(state.firstName)) {
      toast.error("Please insert a valid first name.");
      return;
    }

    if (!validateName(state.lastName)) {
      toast.error("Please insert a valid last name.");
      return;
    }

    if (!validateEmail(state.email)) {
      toast.error("Please insert a valid email.");
      return;
    }

    if (!validatePhoneNumber(state.phoneNumber)) {
      toast.error("Please insert a valid phone number.");
      return;
    }

    if (state.password !== state.reenterPassword) {
      toast.error("Password and Re-enter Password do not match.");
      return;
    }
    navigate("/");
  };

  const handleClickShowPassword = () => {
    dispatch({ type: "TOGGLE_SHOW_PASSWORD" });
  };

  const handleClickShowReenterPassword = () => {
    dispatch({ type: "TOGGLE_SHOW_REENTER_PASSWORD" });
  };

  return (
    <Grid container spacing={isMobile ? 2 : 3} justifyContent="center">
      <Grid item xs={isMobile ? 12 : 6}>
        <TextField
          fullWidth
          label="First Name"
          variant="outlined"
          value={state.firstName}
          placeholder="Enter First Name"
          onChange={(e) =>
            dispatch({ type: "SET_FIRST_NAME", payload: e.target.value })
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ color: "white" }}>
                <PersonIcon />
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
      </Grid>
      <Grid item xs={isMobile ? 12 : 6}>
        <TextField
          fullWidth
          label="Last Name"
          variant="outlined"
          value={state.lastName}
          placeholder="Enter Last Name"
          onChange={(e) =>
            dispatch({ type: "SET_LAST_NAME", payload: e.target.value })
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ color: "white" }}>
                <PersonIcon />
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
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={state.email}
          placeholder="Enter Email"
          onChange={(e) =>
            dispatch({ type: "SET_EMAIL", payload: e.target.value })
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ color: "white" }}>
                <EmailIcon />
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
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Phone Number"
          variant="outlined"
          value={state.phoneNumber}
          placeholder="Enter Phone Number"
          onChange={(e) =>
            dispatch({ type: "SET_PHONE_NUMBER", payload: e.target.value })
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ color: "white" }}>
                <PhoneIcon />
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
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type={state.showPassword ? "text" : "password"}
          value={state.password}
          placeholder="Enter Password"
          onChange={handlePasswordChange}
          onFocus={() => validatePassword(state.password)} // Validate on focus
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
                  {state.showPassword ? <Visibility /> : <VisibilityOff />}
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
        {state.password && (
          <Typography variant="caption" sx={{ color: "red", marginTop: 1 }}>
            {passwordError}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Re-enter Password"
          variant="outlined"
          type={state.showReenterPassword ? "text" : "password"}
          value={state.reenterPassword}
          placeholder="Enter Password Again"
          onChange={(e) =>
            dispatch({ type: "SET_REENTER_PASSWORD", payload: e.target.value })
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ color: "white" }}>
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" sx={{ color: "white" }}>
                <IconButton
                  onClick={handleClickShowReenterPassword}
                  edge="end"
                  sx={{ color: "white" }}
                >
                  {state.showReenterPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
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
      </Grid>

      <Divider
        sx={{
          marginTop: isMobile ? 2 : 3,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Grid item xs={12}>
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
          <Box
            onClick={handleCheckboxChange}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Checkbox
              checked={isCheckboxChecked}
              onChange={() => {}}
              color="primary"
              sx={{
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
            />
            <Typography variant="body2" sx={{ color: "white", marginLeft: 1 }}>
              I agree to the{" "}
              <Link
                component="span"
                variant="body2"
                onClick={handleTermsDialogOpen}
                style={{
                  cursor: "pointer",
                  color: "white",
                  textDecoration: "underline",
                }}
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                component="span"
                variant="body2"
                onClick={handlePrivacyDialogOpen}
                style={{
                  cursor: "pointer",
                  color: "white",
                  textDecoration: "underline",
                }}
              >
                Privacy Policy
              </Link>
            </Typography>
          </Box>
        </Grid>
        {/* Dialogs */}
        <TermsDialog
          isOpen={isTermsDialogOpen}
          handleClose={handleDialogClose}
        />
        <PrivacyDialog
          isOpen={isPrivacyDialogOpen}
          handleClose={handleDialogClose}
        />
      </Box>
    </Grid>
  );
}
