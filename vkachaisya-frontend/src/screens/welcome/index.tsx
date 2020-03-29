import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link } from '@material-ui/core';
import { Carousel } from '../../components/welcome/Carousel';
import { Button } from '../../components/ui/Button';

export const Welcome = () => (
  <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%" width="100%">
    <Box p={3}>
      <Carousel />
    </Box>
    <Box p={3}>
      <Link component={RouterLink} to="/challenges">
        <Button color="primary" variant="contained">
          Начать
        </Button>
      </Link>
    </Box>
  </Box>
);
