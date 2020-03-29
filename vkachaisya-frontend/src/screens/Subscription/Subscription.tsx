import React, { useEffect } from 'react';
import { Box, Typography, Grid, Avatar } from '@material-ui/core';
import { bindActionCreators, Dispatch } from 'redux';
import { getReports, clearReports } from '../../store/reports/actions';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import { selectCurrentUser } from '../../store/user/selectors';
import { withRouter, RouteComponentProps, Link, generatePath } from 'react-router-dom';
import { getUserSubscription } from '../../store/subscriptions/actions';
import { selectUserSubscription } from '../../store/subscriptions/selectors';
import { selectReports } from '../../store/reports/selectors';
import { Routes } from '../../entry/Routes';

const mapStateToProps = (state: IApplicationState) => ({
  currentUser: selectCurrentUser(state),
  userSubscription: selectUserSubscription(state),
  reports: selectReports(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getReports,
      clearReports,
      getUserSubscription,
    },
    dispatch,
  );

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = StateProps & DispatchProps & RouteComponentProps;

const Subscription: React.FC<Props> = ({
  getReports,
  currentUser,
  match,
  userSubscription,
  getUserSubscription,
  reports,
}) => {
  const { subscriptionId } = match.params as any;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlUserId = urlParams.get('userId');

    let userId;
    if (urlUserId) {
      userId = parseInt(urlUserId);
    } else if (currentUser) {
      userId = currentUser.id;
    }

    if (userId) {
      getUserSubscription(userId, subscriptionId);
      getReports(userId, subscriptionId);
    }

    return () => {
      clearReports();
    };
  }, [currentUser, getReports, getUserSubscription, subscriptionId]);

  if (!userSubscription) {
    return null;
  }

  const days = [];

  for (let i = 0; i < userSubscription.challenge.days; i++) {
    const day = i + 1;

    const hasReport = reports.find((report) => report.day === day);

    days.push({ number: day, hasReport });
  }

  return (
    <Box height="100%" width="100%">
      <Box p={3}>
        <Box>
          <Typography variant="h1">Challenge {userSubscription.challenge.title}</Typography>
        </Box>
        <Box my={2}>
          <Typography>Прогресс</Typography>
          <Typography variant="h1">12%</Typography>
        </Box>
        <Box my={2}>
          <Grid spacing={2} alignContent="space-between" container>
            {days.map((day, idx) => (
              <Link
                to={generatePath(Routes.SUBSCRIPTION_REPORT_DAY, { subscriptionId, reportDay: day.number })}
                key={idx}
              >
                <Grid>
                  <Avatar>{day.number}</Avatar>
                </Grid>
              </Link>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Subscription));
