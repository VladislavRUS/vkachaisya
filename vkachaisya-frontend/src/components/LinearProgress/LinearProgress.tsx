import React from 'react';
import styled, { css } from 'styled-components';
import { LinearProgress as MuiLinearProgress, LinearProgressProps as MuiLinearProgressProps } from '@material-ui/core';

enum MuiProgressColor {
  primary = 'primary',
  secondary = 'secondary',
}

export const isProgressColor = (color: any): color is MuiProgressColor => color in MuiProgressColor;

const StyledLinearProgress = styled(({ color, ...props }) => (
  <MuiLinearProgress color={isProgressColor(color) ? MuiProgressColor[color] : 'secondary'} {...props} />
))`
  ${({ theme, color }) =>
    color === 'secondary' &&
    css`
      &.MuiLinearProgress-root {
        height: 8px;
        border-radius: 49px;
      }

      &.MuiLinearProgress-colorSecondary {
        background-color: #f3f3f3;
      }

      .MuiLinearProgress-barColorSecondary {
        border-radius: 49px;
        background-color: white;
        background-image: linear-gradient(to top, #ffcd79, rgba(255, 205, 121, 0));
      }
    `};
`;

interface LinearProgressProps extends Omit<MuiLinearProgressProps, 'color'> {
  color?: string;
}

const LinearProgress: React.FC<LinearProgressProps> = (props) => (
  <StyledLinearProgress color="secondary" variant="determinate" {...props} />
);

export { LinearProgress };
