import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
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
import { TextField } from '../../components/TextField';
import { Switch } from '../../components/Switch';
import { Layout } from '../../components/Layout';
import { Modal } from '../../components/Modal';

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

export interface FormValues {
  title: string;
  description: string;
  days: number;
  hashtag: string;
  withReport?: boolean;
}

const Header = () => <AppBar left={<BackLink to={Routes.SUBSCRIPTIONS} />} center="Создание челленджа" />;

const hashtagStart = '#ВКачайся';

const hashtag = (value: string) => (value ? value.replace(/[^(А-Яа-яA-Za-z0-9)]/, '') : '');
const digits = (value: string) => (value ? value.replace(/[^\d]/, '') : '');

const CreateChallenge: React.FC<Props> = ({ createChallenge, isCreating }) => {
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (values: FormValues) => {
    // TODO
    // createChallenge({
    //   ...values,
    //   withReport: Boolean(values.withReport),
    //   hashtag: `${hashtagStart}${values.hashtag}`,
    // });
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
    //TODO
    // redirect to challenges
  };

  return (
    <Layout
      header={<Header />}
      body={
        <Box display="flex" flexDirection="column" flexGrow="1">
          <Form
            onSubmit={onSubmit}
            render={({ values, handleSubmit, valid }) => (
              <StyledForm onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" justifyContent="space-between" flexGrow="1">
                  <Box flexGrow="1" m="27px">
                    <Field
                      name="title"
                      render={({ input, meta }) => (
                        <Box mb="25px">
                          <TextField
                            label="Заголовок"
                            placeholder="Название челленджа"
                            fullWidth
                            {...input}
                            required
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              maxLength: 100,
                            }}
                          />
                        </Box>
                      )}
                    />

                    <Field
                      name="hashtag"
                      format={hashtag}
                      render={({ input, meta }) => (
                        <Box mb="25px">
                          <TextField
                            label="Хештег"
                            placeholder="Название"
                            fullWidth
                            {...input}
                            required
                            InputLabelProps={{
                              shrink: true,
                            }}
                            InputProps={{
                              startAdornment: hashtagStart,
                            }}
                            inputProps={{
                              maxLength: 50,
                            }}
                          />
                        </Box>
                      )}
                    />

                    <Field
                      name="days"
                      format={digits}
                      render={({ input, meta }) => (
                        <Box mb="25px">
                          <TextField
                            label="Количество дней"
                            placeholder="Введите количество дней"
                            fullWidth
                            {...input}
                            required
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                            }}
                          />
                        </Box>
                      )}
                    />

                    <Field
                      name="description"
                      render={({ input, meta }) => (
                        <Box mb="25px">
                          <TextField
                            {...input}
                            label="Описание"
                            placeholder="Цель вашего челленджа"
                            multiline={true}
                            rowsMax={6}
                            required
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              maxLength: 255,
                            }}
                          />
                        </Box>
                      )}
                    />

                    <Field
                      name="withReport"
                      type="checkbox"
                      render={({ input, meta }) => (
                        <Box>
                          <Switch {...input} label="Отчетность"></Switch>
                        </Box>
                      )}
                    />
                  </Box>

                  <Box mx={2} mt="auto">
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      type={'submit'}
                      disabled={isCreating || !valid}
                    >
                      Добавить челлендж
                    </Button>
                  </Box>

                  <Modal.Create
                    hashtag={`${hashtagStart}${values.hashtag}`}
                    onBackButtonClick={onCloseModal}
                    open={showModal}
                  />
                </Box>
              </StyledForm>
            )}
          />
        </Box>
      }
    />
  );
};

export default connect(null, mapDispatchToProps)(CreateChallenge);
