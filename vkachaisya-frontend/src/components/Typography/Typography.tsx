import React from 'react';
import styled, { css } from 'styled-components';
import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@material-ui/core';

enum MuiTypographyColor {
  initial = 'initial',
  primary = 'primary',
  secondary = 'secondary',
  textPrimary = 'textPrimary',
  textSecondary = 'textSecondary',
  error = 'error',
}

export interface TypographyProps extends Omit<MuiTypographyProps, 'color'> {
  // MuiTypographyColor, custom theme color e.g. 'reds: 0', or random color
  color?: MuiTypographyProps['color'] | string;
  fontSize?: string;
  fontWeight?: string | number;
  textTransform?: 'capitalize' | 'lowercase' | 'uppercase' | 'none' | 'inherit';
}

const StyledTypography = styled(({ color, textTransform, fontSize, fontWeight, ...props }: TypographyProps) => (
  <MuiTypography
    color={color && color in MuiTypographyColor ? MuiTypographyColor[color as MuiTypographyColor] : 'initial'}
    {...props}
  />
))`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme, fontWeight = 'inherit' }) => fontWeight};
  font-size: ${({ theme, fontSize = 'inherit' }) => fontSize};
  text-transform: ${({ textTransform = 'inherit' }) => textTransform};

  ${({ theme, variant }) => variant && theme.typography[variant]}

  ${({ color }) =>
    color &&
    !MuiTypographyColor[color as MuiTypographyColor] &&
    css`
      color: ${({ theme }) => (theme.palette[color] ? theme.palette[color] : color)};
    `};
`;

export const Typography: React.FC<TypographyProps> = (props) => (
  <StyledTypography {...props} variant={props.variant || 'inherit'} />
);
