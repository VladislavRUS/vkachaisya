import React from 'react';
import { Box, Grid, AppBarProps as MuiAppBarProps } from '@material-ui/core';
import { StyledAppBar, TopWave, BottomLeftCircle } from './AppBar.styles';
import WaveImage from '../../assets/images/top-wave.svg';

interface SmallAppBarProps extends MuiAppBarProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

interface LargeAppBarProps extends MuiAppBarProps {}

interface AppBar extends React.FC<MuiAppBarProps> {
  Small: React.FC<SmallAppBarProps>;
  Large: React.FC<LargeAppBarProps>;
}

const AppBar: AppBar = (props) => (
  <StyledAppBar {...props} position="relative">
    <TopWave src={WaveImage} />
    <BottomLeftCircle />
    {props.children}
  </StyledAppBar>
);

AppBar.Small = (props) => (
  <AppBar {...props}>
    <Box display="flex" flexDirection="column" justifyContent="flex-end" p={1} width="100%" height="100%">
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
AppBar.Large = (props) => <AppBar {...props} />;

export { AppBar };
