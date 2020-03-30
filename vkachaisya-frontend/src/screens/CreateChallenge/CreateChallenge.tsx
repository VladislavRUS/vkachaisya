import React from 'react';
import { Box, Typography, TextField, Switch, FormControlLabel } from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createChallenge } from '../../store/challenges/actions';
import { IApplicationState } from '../../store';
import { selectIsChallengeCreating } from '../../store/challenges/selectors';
import { Button } from '../../components/Button';
import { StyledForm } from './CreateChallenge.styled';
import { AppBar } from '../../components/AppBar';
import { Routes } from '../../entry/Routes';
import { BackLink } from '../../components/BackLink';

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

const Header = () => (
  <AppBar.Small
    left={<BackLink to={Routes.SUBSCRIPTIONS} />}
    center={
      <Typography variant="h1" noWrap={true}>
        Создание челленджа
      </Typography>
    }
  />
);

const CreateChallenge: React.FC<Props> = ({ createChallenge, isCreating }) => (
  <Box display="flex" flexDirection="column" height="100%" width="100%" bgcolor="grays:0">
    <Header />
    <Box display="flex" flexDirection="column" flexGrow="1">
      <Form
        onSubmit={createChallenge}
        render={({ handleSubmit, valid }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" flexGrow="1">
              <Box flexGrow="1" m={3}>
                <Field
                  name="title"
                  render={({ input, meta }) => (
                    <Box mb={2}>
                      <TextField label="Название" fullWidth {...input} required />
                    </Box>
                  )}
                />

                <Field
                  name="description"
                  render={({ input, meta }) => (
                    <Box mb={2}>
                      <TextField label="Описание" fullWidth {...input} required />
                    </Box>
                  )}
                />

                <Field
                  name="days"
                  render={({ input, meta }) => (
                    <Box mb={2}>
                      <TextField label="Количество дней" fullWidth {...input} required type="number" />
                    </Box>
                  )}
                />

                <Field
                  name="withReport"
                  type="checkbox"
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
              </Box>

              <Box mx={2} mb={7}>
                <Button color="primary" variant="contained" fullWidth type={'submit'} disabled={isCreating || !valid}>
                  Добавить челлендж
                </Button>
              </Box>
            </Box>
          </StyledForm>
        )}
      />
    </Box>
  </Box>
);

export default connect(null, mapDispatchToProps)(CreateChallenge);
