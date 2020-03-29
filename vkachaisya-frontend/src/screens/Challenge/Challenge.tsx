import React from 'react';
import { Box, Typography, Grid, Avatar } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';

export const Challenge = () => {
  const { id } = useParams();
  const history = useHistory();

  const withReport = true;

  const currentDay = Math.random() * 5 + 10;
  const days = Array.from([...Array(30)]).map((_, i) => ({
    idx: i,
    done: !!Math.round(Math.random()),
    pristine: i > currentDay,
  }));

  const onDayClick = (day: any) => {
    if (withReport) {
      alert('ss');
    } else {
      history.replace(`/challenges/${id}/report/${day.idx}`);
    }
  };

  return (
    <Box height="100%" width="100%">
      <Box p={3}>
        <Box>
          <Typography variant="h1">Challenge {id}</Typography>
        </Box>
        <Box my={2}>
          <Typography>Прогресс</Typography>
          <Typography variant="h1">12%</Typography>
        </Box>
        <Box my={2}>
          <Grid spacing={2} alignContent="space-between" container>
            {days.map((day) => (
              <Grid key={day.idx} item onClick={() => onDayClick(day)}>
                <Avatar>{day.idx + 1}</Avatar>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
