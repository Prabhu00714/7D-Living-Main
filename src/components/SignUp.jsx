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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SignUpPc from './SignUpPc';
import SignUpMobile from './SignUpMobile';

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

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@_])[A-Za-z0-9@_]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@ or _)'
      ),
    reenterPassword: Yup.string()
      .required('Re-enter Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      reenterPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Sign Up clicked', values);
      // Implement your sign-up logic using the form values
      navigate('/login');
    },
  });


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
            {isMobile ? < SignUpMobile  
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              showPassword={showPassword}
              password={password}
              setPassword={setPassword}
              handleClickShowPassword={handleClickShowPassword}
              showReenterPassword={showReenterPassword}
              reenterPassword={reenterPassword}
              setReenterPassword={setReenterPassword}
              handleClickShowReenterPassword={handleClickShowReenterPassword}
              formik={formik}
              /> 
              :
              < SignUpPc  
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              showPassword={showPassword}
              password={password}
              setPassword={setPassword}
              handleClickShowPassword={handleClickShowPassword}
              showReenterPassword={showReenterPassword}
              reenterPassword={reenterPassword}
              setReenterPassword={setReenterPassword}
              handleClickShowReenterPassword={handleClickShowReenterPassword}
              formik={formik}
              />}
          </Scrollbar>
          <Button variant="contained" color="primary" onClick={handleSignUp} sx={{ marginTop: 'auto' }}>
            Sign Up
          </Button>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
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
