import React from 'react';
import { ButtonProps } from '@material-ui/core';
import { StyledButton } from './SquareButton.styles';
import { Icon } from '../Icon';
import { Typography } from '../Typography';

const SquareButton: React.FC<
  Omit<ButtonProps, 'color'> & {
    iconName?: string;
    iconRotate?: string;
    width?: string;
    height?: string;
    color?: string;
  }
> = ({ color = 'warning', ...props }) => (
  <StyledButton color={color} {...props}>
    {props.iconName ? (
      <Icon
        name={props.iconName}
        rotate={props.iconRotate}
        size={props.size === 'large' ? 14 : 10}
        color={color === 'default' ? '#7a8e9c' : 'white'}
      />
    ) : (
      <Typography fontSize="12px" fontWeight={700} color={color === 'default' ? '#7a8e9c' : 'white'}>
        {props.children}
      </Typography>
    )}
  </StyledButton>
);

export { SquareButton };
