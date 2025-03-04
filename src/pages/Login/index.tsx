import * as React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import Loader from '../../components/Loader';
import useLogin from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { ERequestStatus } from '../../types/ERequestStatus';

const Login: React.FC = () => {
  const { login, auth, requestStatus, error } = useLogin();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  React.useEffect(() => {
    if (auth) {
      navigate('/profile');
    }
  }, [auth, requestStatus, navigate]);

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
        <Box component="form" sx={{ width: '100%' }} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            variant="outlined"
            type="email"
            autoComplete="email"
            autoFocus
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            variant="outlined"
            type={'password'}
            autoComplete="current-password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ mt: 3, mb: 2 }}>
            {requestStatus === ERequestStatus.LOADING ? (
              <Loader />
            ) : (
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  py: 1.5,
                }}
              >
                Submit
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
