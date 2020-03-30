import React from 'react';
import styled from 'styled-components';
import {
  Box,
  CircularProgress as MuiCircularProgress,
  CircularProgressProps as MuiCircularProgressProps,
} from '@material-ui/core';

enum MuiProgressColor {
  inherit = 'inherit',
  primary = 'primary',
  secondary = 'secondary',
}

export const isProgressColor = (color: any): color is MuiProgressColor => color in MuiProgressColor;

const StyledCircularProgress = styled(({ color, ...props }) => (
  <MuiCircularProgress color={isProgressColor(color) ? MuiProgressColor[color] : 'inherit'} {...props} />
))`
  color: ${({ theme, color }) => (theme.palette[color] ? theme.palette[color] : color)};
`;

interface CircularProgressProps extends Omit<MuiCircularProgressProps, 'color'> {
  color?: string;
}

type MuiCircularProgress = React.ComponentType<CircularProgressProps>;

type CircularProgress = MuiCircularProgress & {
  Main: MuiCircularProgress;
};

const CircularProgress: CircularProgress = (props) => <StyledCircularProgress color="secondary" {...props} />;
const ProgressMain: MuiCircularProgress = (props) => (
  <Box display="flex" alignItems="center" justifyContent="center" height="100%">
    <CircularProgress color="secondary" size={100} thickness={3} {...props} />
  </Box>
);

CircularProgress.Main = ProgressMain;

export { CircularProgress };
