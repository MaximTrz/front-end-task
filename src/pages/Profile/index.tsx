import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalWindow from '../../components/ModalWindow';
import { Avatar, Box, Button, Typography } from '@mui/material';
import Loader from '../../components/Loader';

import useLogin from '../../hooks/useLogin';
import useProfile from '../../hooks/useProfile';
import useAuthorQuote from '../../hooks/useAuthorQuote';

import { ERequestStatus } from '../../types/ERequestStatus';

const Profile: React.FC = () => {
  const { auth, token } = useLogin();

  const { getProfile, fullname, requestStatus } = useProfile();

  const {
    getAuthor,
    getQuote,
    author,
    quote,
    authorStatus,
    quoteStatus,
    cancelAuthor,
    cancelQuote,
    reset,
  } = useAuthorQuote();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!auth) {
      navigate('/login');
    } else if (token) {
      if (requestStatus === ERequestStatus.IDLE) {
        getProfile(token);
      }
    }
  }, [auth]);

  React.useEffect(() => {
    if (author && quote) {
      setIsModalOpen(false);
    }
  }, [author, quote]);

  const handleUpdate = () => {
    setIsModalOpen(true);
    reset();

    if (token) {
      getAuthor(token)
        .then((res) => {
          if (res.payload) {
            if ('authorId' in res.payload) {
              getQuote(token, res.payload.authorId);
            }
          }
        })
        .catch((error) => {
          console.error('Error fetching author:', error);
        });
    }
  };

  if (requestStatus === ERequestStatus.LOADING) {
    return <Loader />;
  }

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center" padding={2}>
        <Box display="flex" flexDirection="column" alignItems="center" marginRight={4}>
          <Avatar src="img" sx={{ width: 60, height: 60 }} />{' '}
        </Box>

        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Typography variant="h5" fontWeight="bold" marginBottom={1}>
            Welcome, {fullname}!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginBottom: 2 }}
            disabled={
              authorStatus === ERequestStatus.LOADING || quoteStatus === ERequestStatus.LOADING
            }
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-start" marginTop={2}>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {author?.id ? `${author.name}: ${quote?.quote || ''}` : ''}
        </Typography>
      </Box>
      <ModalWindow
        open={isModalOpen}
        onClose={() => {
          reset();
          setIsModalOpen(false);
          cancelAuthor();
          cancelQuote();
        }}
      />
    </>
  );
};

export default Profile;
