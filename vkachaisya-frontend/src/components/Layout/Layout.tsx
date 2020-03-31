import React from 'react';
import { Box } from '@material-ui/core';

const Layout: React.FC<{ header?: any; body: any; withScroll?: boolean }> = ({ header, body, withScroll = true }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="stretch"
    width="100%"
    height="100%"
    overflow="hidden"
    bgcolor="grays:0"
  >
    <Box>{header}</Box>
    <Box pb="8vh" display="flex" flexDirection="column" flexGrow={1} overflow={withScroll ? 'auto' : 'hidden'}>
      {body}
    </Box>
  </Box>
);

export { Layout };
