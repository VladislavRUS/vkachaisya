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

const Subscription: React.FC<Props> = ({
  getReports,
  currentUser,
  match,
  subscriptionResult,
  getSubscriptionResult,
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
      getSubscriptionResult(userId, subscriptionId);
      getReports(userId, subscriptionId);
    }

    return () => {
      clearReports();
    };
  }, [currentUser, getReports, getSubscriptionResult, subscriptionId]);

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
    <Box height="100%" width="100%">
      <Box p={3}>
        <Box>
          <Typography variant="h1">Challenge {subscriptionResult.title}</Typography>
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
