import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

const PageLoader = () => (
  <Box
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    }}
  >
    <CircularProgress disableShrink={true} />
  </Box>
);

export default PageLoader;
