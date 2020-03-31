import React from 'react';
import { Box, Grid, AppBarProps as MuiAppBarProps } from '@material-ui/core';
import { StyledAppBar, TopWave, Circle } from './AppBar.styles';
import WaveImage from '../../assets/images/top-wave.svg';

interface SmallAppBarProps extends MuiAppBarProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

interface LargeAppBarProps extends MuiAppBarProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

interface AppBar extends React.FC<MuiAppBarProps & { circlePosition: 'top' | 'bottom' }> {
  Small: React.FC<SmallAppBarProps>;
  Large: React.FC<LargeAppBarProps>;
}

const AppBar: AppBar = ({ circlePosition, ...props }) => (
  <StyledAppBar {...props} position="sticky">
    <TopWave src={WaveImage} />
    <Circle position={circlePosition} />
    {props.children}
  </StyledAppBar>
);

AppBar.Small = (props) => (
  <AppBar {...props} circlePosition="bottom">
    <Box display="flex" alignItems="flex-end" p={1} pr="19px" width="100%" height="14vh">
      <Grid container alignItems="center">
        <Grid container item xs={2}>
          {props.left}
        </Grid>
        <Grid container item xs={8} justify="center">
          {props.center}
        </Grid>
        <Grid container item xs={2} justify="flex-end">
          {props.right}
        </Grid>
      </Grid>
    </Box>
  </AppBar>
);
AppBar.Large = (props) => (
  <AppBar {...props} circlePosition="top">
    <Box p={1}>{props.left}</Box>
    <Box display="flex" flexDirection="column" justifyContent="flex-end" px="21px" pb="33px" width="100%" height="100%">
      <Grid container alignItems="center">
        <Grid container item xs={10} justify="center">
          {props.center}
        </Grid>
        <Grid container item xs={2} justify="flex-end">
          {props.right}
        </Grid>
      </Grid>
    </Box>
  </AppBar>
);

export { AppBar };
