import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { Routes, Route, NavLink } from 'react-router';
import { Box, Button } from '@mui/material';
import { Container, CssBaseline } from '@mui/material';

import useLogin from '../hooks/useLogin';
import { ERequestStatus } from '../types/ERequestStatus';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Login from '../pages/Login';

const Layout: React.FC = () => {
  const { auth, logout, requestStatus } = useLogin();

  const handleLogout = useCallback(
    ()=>{
      logout();
    },
    [logout]
  )

  const isRequestLoading = useMemo(
    () => requestStatus === ERequestStatus.LOADING,
    [requestStatus] 
  );


  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <div className="layout">
          <header className="layout__header">
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Button variant="outlined" component={NavLink} to="/" disabled={isRequestLoading}>
                About us
              </Button>
              {auth && (
                <Button variant="outlined" component={NavLink} to="/profile" disabled={isRequestLoading}>
                  Profile
                </Button>
              )}
              {auth ? (
                <Button variant="outlined" onClick={handleLogout} disabled={isRequestLoading}>
                  Sign out
                </Button>
              ) : (
                <Button variant="outlined" component={NavLink} to="/login" disabled={isRequestLoading}>
                  Sign in
                </Button>
              )}
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
