import React, { useEffect } from 'react';
import { Box, Grid, Avatar } from '@material-ui/core';
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
import { Layout } from '../../components/Layout';
import { Typography } from '../../components/Typography';

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
  const { subscriptionId, userId } = match.params as any;

  useEffect(() => {
    if (userId) {
      getSubscriptionResult(userId, subscriptionId);
      getReports(userId);
    }

    return () => {
      clearReports();
    };
  }, [currentUser, getReports, getSubscriptionResult, subscriptionId, userId]);

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
    <Layout
      header={<Header title={subscriptionResult.title} />}
      body={
        <>
          <Box m={2} mt={4} mb={1}>
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
                          pathname: generatePath(Routes.SUBSCRIPTION_REPORT_DAY, {
                            subscriptionId,
                            userId,
                            reportDay: day.number,
                          }),
                        }}
                      >
                        <Box p={1}>{day.number}</Box>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
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
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Subscription));
