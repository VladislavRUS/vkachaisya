import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@material-ui/core';

const Button: React.FC<MuiButtonProps> = (props) => <MuiButton {...props} />;

export { Button };
