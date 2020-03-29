import React from 'react';
import { Box } from '@material-ui/core';

type Props = {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
};

const NavigationBar: React.FC<Props> = ({ left, center, right }) => (
  <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Box>{left}</Box>
    <Box>{center}</Box>
    <Box>{right}</Box>
  </Box>
);

export { NavigationBar };
