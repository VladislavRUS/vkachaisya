import React, { useEffect } from 'react';
import { Box, Typography, Grid, Avatar } from '@material-ui/core';
import { bindActionCreators, Dispatch } from 'redux';
import { getReports, clearReports } from '../../store/reports/actions';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import { selectCurrentUser } from '../../store/user/selectors';
import { withRouter, RouteComponentProps, Link, generatePath } from 'react-router-dom';
import { selectSubscriptionResult } from '../../store/subscriptions/selectors';
import { selectReports } from '../../store/reports/selectors';
import { Routes } from '../../entry/Routes';
import { getSubscriptionResult } from '../../store/subscriptions/actions';
import { AppBar } from '../../components/AppBar';
import { BackLink } from '../../components/BackLink';
import { Card } from '../../components/Card';

const mapStateToProps = (state: IApplicationState) => ({
  currentUser: selectCurrentUser(state),
  subscriptionResult: selectSubscriptionResult(state),
  reports: selectReports(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getReports,
      clearReports,
      getSubscriptionResult,
    },
    dispatch,
  );

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = StateProps & DispatchProps & RouteComponentProps;

const Header = ({ title }: any) => (
  <AppBar.Small
    left={<BackLink to={Routes.SUBSCRIPTIONS} />}
    center={
      <Typography variant="h1" noWrap={true}>
        {title}
      </Typography>
    }
  />
);

const Subscription: React.FC<Props> = ({
  getReports,
  currentUser,
  match,
  subscriptionResult,
  getSubscriptionResult,
  reports,
}) => {
  const { subscriptionId } = match.params as any;
  const urlParams = new URLSearchParams(window.location.search);
  const urlUserId = urlParams.get('userId');

  useEffect(() => {
    let userId;
    if (urlUserId) {
      userId = parseInt(urlUserId);
    } else if (currentUser) {
      userId = currentUser.id;
    }

    if (userId) {
      getSubscriptionResult(userId, subscriptionId);
      getReports(userId, subscriptionId);
    }

    return () => {
      clearReports();
    };
  }, [currentUser, getReports, getSubscriptionResult, subscriptionId, urlUserId]);

  if (!subscriptionResult) {
    return null;
  }

  const days = [];

  for (let i = 0; i < subscriptionResult.days; i++) {
    const day = i + 1;

    const hasReport = reports.find((report) => report.day === day);

    days.push({ number: day, hasReport });
  }

  return (
    <Box height="100%" width="100%" bgcolor="grays:0">
      <Header title={subscriptionResult.title} />
      <Box p={3}>
        <Card>
          <Box p={2}>
            <Typography>Прогресс</Typography>
            <Typography variant="h1">12%</Typography>
          </Box>
          <Box m={2}>
            <Grid spacing={1} alignContent="space-between" container>
              {days.map((day, idx) => (
                <Grid item xs={2} key={idx}>
                  <Link
                    to={{
                      pathname: generatePath(Routes.SUBSCRIPTION_REPORT_DAY, { subscriptionId, reportDay: day.number }),
                      search: `?userId=${urlUserId}`,
                    }}
                  >
                    <Box p={1}>{day.number}</Box>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
        <Box>
          <Typography>Участники</Typography>
          <Typography>{subscriptionResult.users.length}</Typography>
          {subscriptionResult.users.map((user) => (
            <Box key={user.id}>
              <Avatar src={user.avatar} />
              <Typography>
                {user.firstName} {user.lastName}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Subscription));
