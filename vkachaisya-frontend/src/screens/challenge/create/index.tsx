import React from 'react';
import { Box, Typography, Button, TextField, Switch, FormControlLabel, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

export const CreateChallenge = () => (
  <Box height="100%" width="100%">
    <Box p={3}>
      <Typography variant="h1">Создание челленджа</Typography>
      <Box>
        <TextField label="Название" fullWidth />
      </Box>

      <Box>
        <TextField label="Описание" fullWidth />
      </Box>
      <Box>
        <TextField label="Количество дней" fullWidth />
      </Box>
      <Box>
        <FormControlLabel
          control={<Switch checked={false} onChange={() => {}} name="checkedB" color="primary" />}
          label="Отчетность"
          labelPlacement="start"
        />
      </Box>
      <Box mt={2}>
        <Link component={RouterLink} to="/challenge/12345">
          <Button color="primary" variant="contained" fullWidth>
            Создать
          </Button>
        </Link>
      </Box>
    </Box>
  </Box>
);
