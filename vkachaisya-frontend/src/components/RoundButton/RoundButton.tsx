import React from 'react';
import { ButtonProps } from '@material-ui/core';
import { StyledButton } from './RountButton.styles';

const RoundButton: React.FC<Omit<ButtonProps, 'size'> & { buttonColor?: string; size?: number }> = (props) => (
  <StyledButton {...props}>{props.children}</StyledButton>
);

export { RoundButton };
