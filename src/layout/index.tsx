import * as React from 'react';
import { Routes, Route } from 'react-router';
import { Box, Button } from '@mui/material';
import { Container, CssBaseline } from '@mui/material';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Login from '../pages/Login';

const Layout: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <div className="layout">
          <header className="layout__header">
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Button variant="outlined">About us</Button>
              <Button variant="outlined">Sign in</Button>
            </Box>
          </header>
          <main className="layout__main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </Container>
    </>
  );
};

export default Layout;
