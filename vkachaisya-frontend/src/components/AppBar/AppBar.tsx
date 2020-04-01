import React from 'react';
import { Box, Grid, AppBarProps as MuiAppBarProps } from '@material-ui/core';
import { StyledAppBar, TopWave, Circle } from './AppBar.styles';
import WaveImage from '../../assets/images/top-wave.svg';
import { Typography } from '../Typography';

interface SmallAppBarProps extends MuiAppBarProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  isTransparent?: boolean;
}

interface LargeAppBarProps extends MuiAppBarProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

interface AppBar extends React.FC<MuiAppBarProps & { circlePosition: 'top' | 'bottom'; isTransparent?: boolean }> {
  Small: React.FC<SmallAppBarProps>;
  Large: React.FC<LargeAppBarProps>;
}

const AppBar: AppBar = ({ circlePosition, ...props }) => (
  <StyledAppBar {...props} position="sticky">
    {!props.isTransparent && (
      <>
        <TopWave src={WaveImage} />
        <Circle position={circlePosition} />
      </>
    )}

    {props.children}
  </StyledAppBar>
);

AppBar.Small = (props) => (
  <AppBar {...props} circlePosition="bottom">
    <Box display="flex" alignItems="center" p={1} pr="19px" width="100%" height="100%">
      <Box width="50px" flexShrink={0}>
        {props.left}
      </Box>
      <Box display="flex" justifyContent="center" flexGrow="1" overflow="hidden">
        <Typography variant="h1" noWrap={true}>
          {props.center}
        </Typography>
      </Box>
      <Box width="50px" flexShrink={0} />
    </Box>
  </AppBar>
);
AppBar.Large = (props) => (
  <AppBar {...props} circlePosition="top">
    <Box p={1}>{props.left}</Box>
    <Box display="flex" flexDirection="column" justifyContent="center" px="21px" pb="33px" width="100%" height="100%">
      <Grid container alignItems="center">
        <Grid container item xs={10} justify="center">
          {props.center}
        </Grid>
        <Grid container item xs={2} justify="flex-end"></Grid>
      </Grid>
    </Box>
  </AppBar>
);

export { AppBar };
