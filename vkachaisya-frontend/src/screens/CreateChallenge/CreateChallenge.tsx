import React from 'react';
import { Box, Typography, Button, TextField, Switch, FormControlLabel } from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { bindActionCreators, Dispatch } from 'redux';
import { createChallenge } from '../../store/challenges/actions';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import { selectIsChallengeCreating } from '../../store/challenges/selectors';

const mapStateToProps = (state: IApplicationState) => ({
  isCreating: selectIsChallengeCreating(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      createChallenge,
    },
    dispatch,
  );

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = StateProps & DispatchProps;

const CreateChallenge: React.FC<Props> = ({ createChallenge, isCreating }) => (
  <Box height="100%" width="100%">
    <Box p={3}>
      <Typography variant="h1">Создание челленджа</Typography>

      <Form
        onSubmit={createChallenge}
        render={({ handleSubmit, valid }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name={'title'}
              render={({ input, meta }) => (
                <Box>
                  <TextField label="Название" fullWidth {...input} required />
                </Box>
              )}
            />

            <Field
              name={'description'}
              render={({ input, meta }) => (
                <Box>
                  <TextField label="Описание" fullWidth {...input} required />
                </Box>
              )}
            />

            <Field
              name={'days'}
              render={({ input, meta }) => (
                <Box>
                  <TextField label="Количество дней" fullWidth {...input} required type={'number'} />
                </Box>
              )}
            />

            <Field
              name={'withReport'}
              type={'checkbox'}
              render={({ input, meta }) => (
                <Box>
                  <FormControlLabel
                    control={<Switch {...input} name="checkedB" color="primary" />}
                    label="Отчетность"
                    labelPlacement="start"
                  />
                </Box>
              )}
            />

            <Box mt={2}>
              <Button color="primary" variant="contained" fullWidth type={'submit'} disabled={isCreating || !valid}>
                Создать
              </Button>
            </Box>
          </form>
        )}
      />
    </Box>
  </Box>
);

export default connect(null, mapDispatchToProps)(CreateChallenge);
