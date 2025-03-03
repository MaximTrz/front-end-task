import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../layout';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default Router;
