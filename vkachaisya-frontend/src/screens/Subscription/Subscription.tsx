import React, { useEffect, useState } from 'react';
import { Box, Grid, Avatar, IconButton } from '@material-ui/core';
import { bindActionCreators, Dispatch } from 'redux';
import { getReports, clearReports } from '../../store/reports/actions';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import { selectCurrentUser } from '../../store/user/selectors';
import { withRouter, RouteComponentProps, generatePath, useHistory } from 'react-router-dom';
import {
  selectIsFetchingSubscriptionResult,
  selectSubscriptionResult,
  selectSubscriptions,
} from '../../store/subscriptions/selectors';
import { selectReports } from '../../store/reports/selectors';
import { Routes } from '../../entry/Routes';
import { clearSubscriptionResult, getSubscriptionResult, getSubscriptions } from '../../store/subscriptions/actions';
import { AppBar } from '../../components/AppBar';
import { BackLink } from '../../components/BackLink';
import { Card } from '../../components/Card';
import { Layout } from '../../components/Layout';
import { Typography } from '../../components/Typography';
import { CircularProgress } from '../../components/CircularProgress';
import { Badge } from '../../components/Badge';
import { Icon } from '../../components/Icon';
import { SquareButton } from '../../components/SquareButton';
import { Modal } from '../../components/Modal';
import { differenceInCalendarDays } from 'date-fns';
import { FloatButton } from '../../components/FloatButton';
import { PageLoader } from '../../components/PageLoader';
import bridge from '@vkontakte/vk-bridge';
import { getCurrentUser } from '../../store/user/actions';

const mapStateToProps = (state: IApplicationState) => ({
  currentUser: selectCurrentUser(state),
  subscriptionResult: selectSubscriptionResult(state),
  reports: selectReports(state),
  isFetchingSubscriptionResult: selectIsFetchingSubscriptionResult(state),
  subscriptions: selectSubscriptions(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getReports,
      clearReports,
      getSubscriptionResult,
      clearSubscriptionResult,
      getSubscriptions,
      getCurrentUser,
    },
    dispatch,
  );

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = StateProps & DispatchProps & RouteComponentProps;

const Header = ({ title }: any) => <AppBar left={<BackLink to={Routes.SUBSCRIPTIONS} />} center={title} />;

const Subscription: React.FC<Props> = ({
  getReports,
  currentUser,
  match,
  subscriptionResult,
  getSubscriptionResult,
  reports,
  isFetchingSubscriptionResult,
  clearSubscriptionResult,
  getCurrentUser,
  subscriptions,
}) => {
  const history = useHistory();

  const { subscriptionId, userId } = match.params as any;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (userId) {
      getSubscriptionResult(userId, subscriptionId);
      getReports(subscriptionId);
    }

    if (!currentUser) {
      getCurrentUser();
    }

    if (subscriptions.length === 0) {
      getSubscriptions();
    }

    return () => {
      clearReports();
      clearSubscriptionResult();
    };
    // eslint-disable-next-line
  }, []);

  if (!subscriptionResult) {
    return <PageLoader />;
  }

  const canJoin = !subscriptions.find((subscription) => subscription.id === subscriptionResult.id);

  const canShare = currentUser && currentUser.id === parseInt(userId);

  const days = [];

  for (let i = 0; i < subscriptionResult.days; i++) {
    const day = i + 1;

    const hasReport = reports.find((report) => report.day === day);
    const disabled = differenceInCalendarDays(new Date(), new Date(subscriptionResult.startDate)) < i;

    days.push({ number: day, hasReport, disabled });
  }

  const reportDays = days.filter(({ hasReport }) => hasReport).length;
  const progress = reportDays < subscriptionResult.days ? Math.ceil((reportDays / subscriptionResult.days) * 100) : 100;

  const progressText = () => {
    if (progress > 50) {
      return 'Ого! Уже больше половины, осталось совсем чуть-чуть';
    }
    return 'Надо бы придумать сюда тексты!';
  };

  const onChooseDay = (day: number) => {
    // if (subscriptionResult.withReport) {
    history.push({
      pathname: generatePath(Routes.SUBSCRIPTION_REPORT_DAY, {
        subscriptionId,
        userId,
        reportDay: day,
      }),
    });
    // }
  };

  const join = () => {
    setShowModal(true);
  };

  const onShare = () => {
    if (currentUser) {
      bridge.send('VKWebAppShare', {
        link: `https://vk.com/app7380006#/subscriptions/${subscriptionId}/users/${currentUser.id}`,
      });
    }
  };

  return (
    <>
      <Layout
        header={<Header title={subscriptionResult.title} />}
        body={
          <>
            {isFetchingSubscriptionResult && <PageLoader />}

            <Box m={2} mt={4} mb={1}>
              <Card>
                <Box display="flex" justifyContent="space-between" p="15px">
                  <Box>
                    <Typography display="block" fontSize="20px" fontWeight={700} color="grays:1">
                      Прогресс
                    </Typography>
                    <Box height="10px" />
                    <Typography display="block" fontSize="14px" fontWeight={400} color="grays:2">
                      {progressText()}
                    </Typography>
                  </Box>
                  <Box ml={2} />
                  <Box>
                    <CircularProgress value={progress} />
                  </Box>
                </Box>
                <Box bgcolor="rgba(196, 196, 196, 0.1)" height="1px" width="100%" />
                <Box>
                  <Box p="15px" pb="20px">
                    <Grid spacing={1} alignContent="space-between" container>
                      {days.map((day, idx) => (
                        <Grid item key={idx}>
                          <SquareButton
                            width="30px"
                            height="30px"
                            disableTouchRipple={day.disabled}
                            color={day.disabled ? 'default' : day.hasReport ? 'success' : 'error'}
                            onClick={() => !day.disabled && onChooseDay(day.number)}
                          >
                            {day.number}
                          </SquareButton>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" pl="15px" pr="3px" pb="3px">
                    <Box pb={'22px'}>
                      <Badge text={subscriptionResult.hashtag} bgColor={'#f7f9fb'} color={'#9ea9b1'} />
                    </Box>
                    {canShare && (
                      <IconButton onClick={onShare}>
                        <Icon name="share" size={24} />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              </Card>
            </Box>
            <Box m="25px" mb="0">
              <Box display="flex" alignItems="center" mb="7px">
                <Typography color="grays:1" fontSize="16px" fontWeight={700}>
                  Участники
                </Typography>
                <Box ml={1} />
                <Typography color="grays:2" fontSize="14px" fontWeight={400}>
                  {subscriptionResult.users.length}
                </Typography>
              </Box>
              {subscriptionResult.users.map((user) => (
                <Box key={user.id} display="flex" alignItems="center" mt="15px">
                  <Avatar src={user.avatar} />
                  <Box ml={2} />
                  <Typography color="grays:1" fontSize="16px" fontWeight={400}>
                    {user.firstName} {user.lastName}
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
        }
      />
      {canJoin && <FloatButton iconName="plus" onClick={join} />}
      <Modal.Join hashtag={subscriptionResult.hashtag} onBackButtonClick={() => setShowModal(false)} open={showModal} />
      {/* <Modal.Complete
        hashtag={subscriptionResult.hashtag}
        onBackButtonClick={() => setShowModal(false)}
        open={showModal}
      /> */}
    </>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Subscription));
