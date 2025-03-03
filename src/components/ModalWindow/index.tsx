import * as React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ModalWindow: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Requesting the quote
        </Typography>
        <Typography variant="body1" gutterBottom>
          Step 1: Requesting author... <strong>Completed</strong>
        </Typography>
        <Typography variant="body1" gutterBottom>
          Step 2: Requesting quote...
        </Typography>
        <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalWindow;
