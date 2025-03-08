import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import './css/Signup.css';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  return (
    <div className='signup'>
      <div className="outer">
      <div className="inner1"></div>

      <div className="inner2">
        <Box
          sx={{
            padding: '2rem',
            borderRadius: '20px',
            width: '80%',
            maxWidth: '400px',
          }}
        >
          <Typography variant="h4" textAlign="center" mb={3}>
            Sign Up
          </Typography>
          <form>
            <TextField fullWidth label="Email or Username" margin="normal" />
            <TextField fullWidth label="Password" type="password" margin="normal" />
            <TextField fullWidth label="Confirm Password" type="password" margin="normal" />
            <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
              LOG IN
            </Button>
          </form>
          <Typography textAlign="center" mt={2}>
            Already have an account? <Link to="/">Log in</Link>
          </Typography>
        </Box>
      </div>
    </div>
    </div>
  );
};

export default SignupPage;
