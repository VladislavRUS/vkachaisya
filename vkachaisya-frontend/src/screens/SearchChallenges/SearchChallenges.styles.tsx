import React from 'react';
import styled from 'styled-components';
import { Link } from '@material-ui/core';

export const ChallengesList = styled.div`
  padding: 20px 16px;
`;

export const Title = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 24px;
  font-weight: 400;
`;

export const StyledLink = styled((props) => <Link {...props} />)`
  font-weight: 800;
  color: white;
`;
