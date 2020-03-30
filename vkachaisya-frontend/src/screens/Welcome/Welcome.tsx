import React from 'react';
import { Box } from '@material-ui/core';
import { Carousel } from '../../components/Carousel';
import { Button } from '../../components/Button';
import { bindActionCreators, Dispatch } from 'redux';
import { createCurrentUser } from '../../store/user/actions';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import { isCurrentUserCreating } from '../../store/user/selectors';

const steps = [
  {
    img: 'https://fakeimg.pl/158x158',
    text: 'Добро пожаловать в ВКачайся!',
  },
  {
    img: 'https://fakeimg.pl/158x158',
    text: 'Ставьте перед собой цели! ',
  },
  {
    img: 'https://fakeimg.pl/158x158',
    text: 'Проходите челленджи вместе с друзьями! ',
  },
  {
    img: 'https://fakeimg.pl/158x158',
    text: 'Делитесь результатами!',
  },
];

const mapStateToProps = (state: IApplicationState) => ({
  isCreating: isCurrentUserCreating(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      createCurrentUser,
    },
    dispatch,
  );

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = StateProps & DispatchProps;

const Welcome: React.FC<Props> = ({ isCreating, createCurrentUser }) => {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="stretch"
      height="100%"
      width="100%"
      bgcolor="grays:0"
    >
      <Box display="flex" flexDirection="column" flexGrow="1" justifyContent="center">
        <Carousel steps={steps} step={activeStep} setStep={setActiveStep} />
      </Box>
      <Box mx={2} mb={7} visibility={activeStep === steps.length - 1 ? 'visible' : 'visible'}>
        <Button color="primary" variant="contained" fullWidth disabled={isCreating} onClick={createCurrentUser}>
          Начать
        </Button>
      </Box>
    </Box>
  );
};

export default connect(null, mapDispatchToProps)(Welcome);
