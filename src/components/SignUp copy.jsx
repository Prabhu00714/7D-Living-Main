// SignUp.jsx
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
import { IconButton, Button, Link, Divider } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import GoogleIcon from '@mui/icons-material/Google';
import Image from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    // Implement your sign-up logic using the state values (firstName, lastName, email, password, reenterPassword)
    console.log('Sign Up clicked', { firstName, lastName, email, password, reenterPassword });
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
        <Paper elevation={24} sx={{ padding: '50px', textAlign: 'center', position: 'relative', margin: 'auto', overflowY: 'auto', maxHeight: '80vh' }}>
          <Avatar
            alt="Logo"
            src={Image}
            sx={{ width: 100, height: 100, position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)' }}
          />
          <Typography variant="h5" component="div" sx={{ marginBottom: '20px' }}>
            Sign Up
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField
              fullWidth
              label="First Name"
              margin="normal"
              variant="standard"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Last Name"
              margin="normal"
              variant="standard"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              variant="standard"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Re-enter Password"
              margin="normal"
              variant="standard"
              type={showPassword ? 'text' : 'password'}
              value={reenterPassword}
              onChange={(e) => setReenterPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSignUp} sx={{ marginTop: '20px' }}>
              Sign Up
            </Button>
          </Box>
          <Divider sx={{ mt: '20px', mb: '20px' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
            <Button variant="outlined" startIcon={<GoogleIcon />} sx={{ mb: 1 }}>
              Sign Up with Google
            </Button>
            <Link component="button" variant="body2" onClick={handleLoginClick}>
              Already have an account? Login
            </Link>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
