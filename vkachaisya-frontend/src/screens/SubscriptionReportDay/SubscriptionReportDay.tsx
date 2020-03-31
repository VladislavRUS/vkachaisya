import React from 'react';
import { withRouter, RouteComponentProps, generatePath } from 'react-router-dom';
import { IApplicationState } from '../../store';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppBar } from '../../components/AppBar';
import { Box, Typography } from '@material-ui/core';
import { BackLink } from '../../components/BackLink';
import { Routes } from '../../entry/Routes';

const mapStateToProps = (state: IApplicationState) => ({});
type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({}, dispatch);
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = StateProps & DispatchProps & RouteComponentProps;

const Header = ({ to, title }: any) => (
  <AppBar.Small
    left={<BackLink to={to} />}
    center={
      <Typography variant="h1" noWrap={true}>
        {title}
      </Typography>
    }
  />
);

const SubscriptionReportDay: React.FC<Props> = ({ match }) => {
  const { subscriptionId, reportDay } = match.params as any;
  const urlParams = new URLSearchParams(window.location.search);
  const urlUserId = urlParams.get('userId');

  console.log(subscriptionId, reportDay);

  return (
    <Box>
      <Header
        to={{
          pathname: generatePath(Routes.SUBSCRIPTION, { subscriptionId }),
          search: `?userId=${urlUserId}`,
        }}
        title={`День ${reportDay}`}
      />
    </Box>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubscriptionReportDay));
