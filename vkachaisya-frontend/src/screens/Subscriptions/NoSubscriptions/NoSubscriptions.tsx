import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Link } from '@material-ui/core';
import { Button } from '../../../components/Button';
import Image from '../../../assets/images/no-challenges.svg';
import { Routes } from '../../../entry/Routes';

const ImageBox = styled(Box)`
  background-image: url(${Image});
  background-position: center center;
  background-repeat: no-repeat;
`;

const NoSubscriptions = () => {
  return (
    <Box display="flex" flexDirection="column" flexGrow={1} width="100%" overflow="hidden">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        flexGrow={1}
        overflow="hidden"
      >
        <ImageBox
          mt={5}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          flexGrow={1}
          overflow="hidden"
        />
        <Box m={4}>
          <Typography align="center" variant="h4">
            У вас пока нет челленджей
          </Typography>
        </Box>
      </Box>
      <Box mx={2} mb="11px">
        <Link component={RouterLink} underline="none" to={Routes.SEARCH_CHALLENGES}>
          <Button color="primary" variant="contained" fullWidth>
            Выбрать из списка
          </Button>
        </Link>
      </Box>
      <Box mx={2}>
        <Link component={RouterLink} underline="none" to={Routes.CREATE_CHALLENGE}>
          <Button color="secondary" variant="contained" fullWidth>
            Создать свой челлендж
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export { NoSubscriptions };
