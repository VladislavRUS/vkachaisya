import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { Carousel } from '../../components/Carousel';
import { Button } from '../../components/Button';
import { bindActionCreators, Dispatch } from 'redux';
import { createCurrentUser } from '../../store/user/actions';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import { isCurrentUserCreating } from '../../store/user/selectors';
import bridge from '@vkontakte/vk-bridge';
import { AnyReceiveMethodName, VKBridgeEvent } from '@vkontakte/vk-bridge/dist/types/src/types/bridge';
import { IUser } from '../../types/index';
import { mockUser } from '../../mock';
import Welcome1 from '../../assets/images/welcome1.svg';
import Welcome2 from '../../assets/images/welcome2.svg';
import Welcome3 from '../../assets/images/welcome3.svg';
import Welcome4 from '../../assets/images/welcome4.svg';
import { motion } from 'framer-motion';
import { Layout } from '../../components/Layout';

const steps = [
  {
    img: Welcome1,
    imgWidth: 201,
    imgHeight: 217,
    text: ['Добро пожаловать', 'в ВКачайся!'],
  },
  {
    img: Welcome2,
    imgWidth: 212,
    imgHeight: 213,
    text: ['Ставь перед', 'собой новые цели!'],
  },
  {
    img: Welcome3,
    imgWidth: 192,
    imgHeight: 204,
    text: ['Проходи челленджи', 'вместе с друзьями!'],
  },
  {
    img: Welcome4,
    imgWidth: 283,
    imgHeight: 297,
    text: ['Делись своими', 'результатами!'],
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
  const [showButton, setShowButton] = React.useState(false);

  useEffect(() => {
    const listener = (event: VKBridgeEvent<AnyReceiveMethodName>) => {
      if (event.detail.type === 'VKWebAppGetUserInfoResult') {
        const { data } = event.detail;

        const user: IUser = {
          id: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          avatar: data.photo_100,
        };

        createCurrentUser(user);
      }
    };

    bridge.subscribe(listener);

    return () => bridge.unsubscribe(listener);
  }, [createCurrentUser]);

  useEffect(() => {
    if (activeStep === steps.length - 1) {
      setShowButton(true);
    }
  }, [activeStep]);

  const onStart = () => {
    if (process.env.NODE_ENV === 'development') {
      createCurrentUser(mockUser);
    } else {
      bridge.send('VKWebAppGetUserInfo', {});
    }
  };

  const variants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <Layout
      body={
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="stretch"
          height="100%"
          width="100%"
          flexGrow={'1'}
        >
          <Box display="flex" flexDirection="column" flexGrow="1" justifyContent="center">
            <Carousel steps={steps} step={activeStep} setStep={setActiveStep} />
          </Box>
          <motion.div variants={variants} animate={showButton ? 'visible' : 'hidden'} initial={'hidden'}>
            <Box mx={2}>
              <Button color="primary" variant="contained" fullWidth disabled={isCreating} onClick={onStart}>
                Начать
              </Button>
            </Box>
          </motion.div>
        </Box>
      }
    />
  );
};

export default connect(null, mapDispatchToProps)(Welcome);
