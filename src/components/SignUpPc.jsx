// SignUpPc.jsx
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, Grid } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';


export default function SignUpPc({ 
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  showPassword,
  password,
  setPassword,
  handleClickShowPassword,
  showReenterPassword,
  reenterPassword,
  setReenterPassword,
  handleClickShowReenterPassword,
  formik
  }) 
  {

  return (
    <Grid container spacing={2}>
    <Grid item xs={6}>
      <TextField
        label="First Name"
        variant="standard"
        placeholder='First Name'
        value={formik.values.firstName}
        onChange={formik.handleChange('firstName')}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
        size="large"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Last Name"
        variant="standard"
        value={lastName}
        placeholder='Last Name'
        onChange={(e) => setLastName(e.target.value)}
        size="large"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Email"
        variant="standard"
        value={email}
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        size="large"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Phone Number"
        variant="standard"
        value={phoneNumber}
        placeholder='Phone Number'
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
                {showPassword ? <Visibility /> : <VisibilityOff />}
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
                {showReenterPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        size="large"
      />
    </Grid>
  </Grid>

  );
}
