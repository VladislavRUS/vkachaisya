import React from 'react';
import { Box, Grid, AppBarProps as MuiAppBarProps } from '@material-ui/core';
import { StyledPanelHeader, TopWave, Circle, Content } from './AppBar.styles';
import WaveImage from '../../assets/images/top-wave.svg';
import { Typography } from '../Typography';

// interface AppBarProps extends MuiAppBarProps {
//   isTransparent?: boolean;
//   left?: any;
//   right?: any;
//   center?: string;
// }

const AppBar = ({ ...props }) => (
  <StyledPanelHeader>
    {!props.isTransparent && (
      <>
        <TopWave src={WaveImage} />
        <Circle />
      </>
    )}
    <Content display="flex" alignItems="center" p={1} pr="19px" width="100%" height="56px">
      <Box width="50px" flexShrink={0}>
        {props.left}
      </Box>
      <Box display="flex" justifyContent="center" flexGrow="1" overflow="hidden">
        <Typography variant="h1" noWrap={true}>
          {props.center}
        </Typography>
      </Box>
      <Box width="50px" flexShrink={0} />
    </Content>
  </StyledPanelHeader>
);

export { AppBar };
