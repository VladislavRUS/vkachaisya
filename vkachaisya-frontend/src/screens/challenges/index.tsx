import React from 'react';
import { Box, Typography, Link, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

export const Challenges = () => (
  <Box height="100%" width="100%">
    <Box height="100%" p={3}>
      <Box>
        <Typography>Выбери челендж из списка или</Typography>
        <Link component={RouterLink} to="/challenge/create">
          создай свой
        </Link>
      </Box>
      <List>
        {Array.from([...Array(20)]).map((_, i) => (
          <Link key={i} component={RouterLink} to={`/challenge/${i}`}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>{i}</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  </Box>
);
