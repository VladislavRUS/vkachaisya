import React from 'react';
import { ButtonProps } from '@material-ui/core';
import { StyledButton } from './Button.styles';

const Button: React.FC<ButtonProps> = (props) => <StyledButton {...props}></StyledButton>;

export { Button };
