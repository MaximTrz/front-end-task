import * as React from 'react';
import { Card } from '@mui/material';

import './style.scss';

const Home: React.FC = () => {
  return (
    <>
      <Card variant="outlined">{'Little story about the company'}</Card>
    </>
  );
};

export default Home;
