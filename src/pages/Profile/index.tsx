import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Typography } from '@mui/material';

import useLogin from '../../hooks/useLogin';

const Profile: React.FC = () => {
  const { auth } = useLogin();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [auth]);

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center" padding={2}>
        <Box display="flex" flexDirection="column" alignItems="center" marginRight={4}>
          <Avatar src="img" sx={{ width: 60, height: 60 }} />{' '}
        </Box>

        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Typography variant="h5" fontWeight="bold" marginBottom={1}>
            Welcome, Alexey!
          </Typography>
          <Button variant="contained" color="primary" sx={{ marginBottom: 2 }}>
            Update
          </Button>
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-start" marginTop={2}>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          [here is place for concatenated result from long running call]
        </Typography>
      </Box>
    </>
  );
};

export default Profile;
