// SignUpMobilejsx
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

export default function SignUpMobile({ firstName,
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
  handleClickShowReenterPassword}) 
  {

  return (
    
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                  label="First Name"
                  variant="standard"
                  value={firstName}
                  placeholder='First Name'
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Last Name"
                  variant="standard"
                  value={lastName}
                  placeholder='Last Name'
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Email"
                  variant="standard"
                  value={email}
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Phone Number"
                  variant="standard"
                  value={phoneNumber}
                  placeholder='Phone Number'
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
                          {showPassword ? <Visibility /> : <VisibilityOff />}
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
                          {showReenterPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Box>
            
  );
}
