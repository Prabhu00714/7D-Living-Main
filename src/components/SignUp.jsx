import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, Button, Link, Divider, Grid, useMediaQuery, useTheme } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import GoogleIcon from '@mui/icons-material/Google';
import Image from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import Scrollbar from 'react-scrollbar';

export default function SignUp() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [showReenterPassword, setShowReenterPassword] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowReenterPassword = () => {
    setShowReenterPassword(!showReenterPassword);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    // Implement your sign-up logic using the state values
    console.log('Sign Up clicked', { firstName, lastName, email, phoneNumber, password, reenterPassword });
  };

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Paper elevation={24} sx={{ padding: '20px', textAlign: 'center', position: 'relative', margin: 'auto' }}>
          <Avatar alt="Logo" src={Image} sx={{ width: 100, height: 100, margin: 'auto' }} />
          <Typography variant="h5" component="div" sx={{ marginBottom: '20px' }}>
            Sign Up
          </Typography>
          <Scrollbar style={{ height: 'calc(80vh - 200px)' }}>
            {isMobile ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                  label="First Name"
                  variant="standard"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Last Name"
                  variant="standard"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Email"
                  variant="standard"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Phone Number"
                  variant="standard"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Password"
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
                          sx={{mr: 0.2}}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
                <TextField
                  label="Re-enter Password"
                  variant="standard"
                  type={showReenterPassword ? 'text' : 'password'}
                  value={reenterPassword}
                  onChange={(e) => setReenterPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowReenterPassword}
                          edge="end"
                          sx={{mr: 0.2}}
                        >
                          {showReenterPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Box>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="First Name"
                    variant="standard"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    size="large"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Last Name"
                    variant="standard"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    size="large"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="large"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Phone Number"
                    variant="standard"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    size="large"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Password"
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
                    size="large"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Re-enter Password"
                    variant="standard"
                    type={showReenterPassword ? 'text' : 'password'}
                    value={reenterPassword}
                    onChange={(e) => setReenterPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowReenterPassword}
                            edge="end"
                          >
                            {showReenterPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    size="large"
                  />
                </Grid>
              </Grid>
            )}
          </Scrollbar>
          <Button variant="contained" color="primary" onClick={handleSignUp} sx={{ marginTop: 'auto' }}>
            Sign Up
          </Button>
          <Divider sx={{ mt: '20px', mb: '20px' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
            {/* <Button variant="outlined" startIcon={<GoogleIcon />} sx={{ mb: 1 }}>
              Sign Up with Google
            </Button> */}
            <Link component="button" variant="body2" onClick={handleLoginClick}>
              Already have an account? Login
            </Link>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
