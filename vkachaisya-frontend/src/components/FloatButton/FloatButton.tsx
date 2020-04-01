import React from 'react';
import { Box, ButtonProps } from '@material-ui/core';
import { StyledButton } from './FloatButton.styles';
import { Icon } from '../Icon';
import { Typography } from '../Typography';

const FloatButton: React.FC<
  Omit<ButtonProps, 'color'> & {
    iconName?: string;
    iconRotate?: string;
    width?: string;
    height?: string;
    color?: string;
  }
> = ({ color = 'warning', ...props }) => (
  <Box position="fixed" bottom="8vh" right="16px">
    <StyledButton color={color} {...props}>
      {props.iconName ? (
        <Icon name={props.iconName} rotate={props.iconRotate} size={18} color="white" />
      ) : (
        <Typography fontSize="12px" fontWeight={700} color={color === 'default' ? '#7a8e9c' : 'white'}>
          {props.children}
        </Typography>
      )}
    </StyledButton>
  </Box>
);

export { FloatButton };
