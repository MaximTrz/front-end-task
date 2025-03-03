import * as React from 'react';
import { Box, Button, TextField } from '@mui/material';

const Login: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'background.paper',
        }}
      >
        <Box component="form" sx={{ width: '100%' }}>
          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            variant="outlined"
            type="email"
            autoComplete="email"
            autoFocus
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            variant="outlined"
            type={'password'}
            autoComplete="current-password"
            required
          />

          <Box sx={{ mt: 3, mb: 2 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
