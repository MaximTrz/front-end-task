import * as React from 'react';
import { useEffect } from 'react';
import { Card } from '@mui/material';
import Loader from '../../components/Loader';

import useStore from '../../hooks/useStore';
import { ERequestStatus } from '../../types/ERequestStatus';

import './style.scss';

const Home: React.FC = () => {
  const { aboutUs, fetchAboutUs } = useStore();

  useEffect(() => {
    if (aboutUs.requestStatus === ERequestStatus.IDLE) {
      fetchAboutUs();
    }
  }, [aboutUs.requestStatus]);

  return (
    <>
      {aboutUs.requestStatus === ERequestStatus.LOADING ? (
        <Loader />
      ) : (
        <Card variant="outlined">{aboutUs.value || 'Нет информации'}</Card>
      )}
    </>
  );
};

export default Home;
