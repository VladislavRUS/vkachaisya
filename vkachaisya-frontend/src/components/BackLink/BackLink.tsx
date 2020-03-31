import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, IconButton } from '@material-ui/core';
import { Icon } from '../Icon';

const BackLink = ({ to }: { to: string }) => (
  <Link to={to} component={RouterLink}>
    <IconButton>
      <Icon name="arrow" color="white" size={16} />
    </IconButton>
  </Link>
);

export { BackLink };
