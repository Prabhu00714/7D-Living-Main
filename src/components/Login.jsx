// Login.jsx
import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MailIcon from '@mui/icons-material/Mail';
import PasswordIcon from '@mui/icons-material/Password';
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, Button, Link } from '@mui/material';
import Image from '../assets/Logo.png';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignupClick = () => {
    // Use navigate to redirect to SignUp.jsx
    navigate('/signup');
  };

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Paper elevation={24} sx={{ padding: '50px', textAlign: 'center', position: 'relative' }}>
          <Avatar
            alt="Logo"
            src={Image}
            sx={{ width: 100, height: 100, position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)' }}
          />
          <Typography variant="h4" component="div" sx={{ marginTop: '70px', fontFamily: 'Sans serif fonts' }}>
            Login
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <MailIcon sx={{ color: 'action.active', mr: 1, my: 0.5, mt: 2 }} />
            <TextField
              id="input-with-sx"
              placeholder="xyz@gmail.com"
              label="Enter Email"
              variant="standard"
              fullWidth
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5, mt: 2 }} />
            <TextField
              id="input-with-sx"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              variant="standard"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ mb: 1 }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
            <Button variant="outlined" startIcon={<GoogleIcon />} sx={{ mb: 1 }}>
              Sign Up with Google
            </Button>
            {/* Use handleSignupClick to navigate to SignUp.jsx */}
            <Link component="button" variant="body2" onClick={handleSignupClick}>
              Or sign up with Email
            </Link>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
