import React, { useEffect } from 'react';
import { Box, Typography, IconButton } from '@material-ui/core';
import { bindActionCreators, Dispatch } from 'redux';
import { getSubscriptions } from '../../store/subscriptions/actions';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import { AppBar } from '../../components/AppBar';
import { Link, generatePath } from 'react-router-dom';
import { Routes } from '../../entry/Routes';
import { selectSubscriptions } from '../../store/subscriptions/selectors';
import { selectCurrentUser } from '../../store/user/selectors';
import { Icon } from '../../components/Icon';
import { SquareButton } from '../../components/SquareButton';

const mapStateToProps = (state: IApplicationState) => ({
  user: selectCurrentUser(state),
  subscriptions: selectSubscriptions(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getSubscriptions,
    },
    dispatch,
  );

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = StateProps & DispatchProps;

const Header = () => (
  <AppBar.Small
    left={
      <Link to={Routes.SEARCH_CHALLENGES}>
        <IconButton>
          <Icon name="search" size={18} />
        </IconButton>
      </Link>
    }
    center={
      <Typography variant="h1" noWrap={true}>
        Мои челленджи
      </Typography>
    }
    right={
      <Link to={Routes.CREATE_CHALLENGE}>
        <SquareButton iconName="plus" />
      </Link>
    }
  />
);

const Subscriptions: React.FC<Props> = ({ getSubscriptions, subscriptions, user }) => {
  useEffect(() => {
    getSubscriptions();
  }, [getSubscriptions]);

  if (!user) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" height="100%" width="100%" bgcolor="grays:0">
      <Header />

      {subscriptions.map((subscription) => (
        <Link
          key={subscription.id}
          to={{
            pathname: generatePath(Routes.SUBSCRIPTION, { subscriptionId: subscription.id }),
            search: `?userId=${user.id}`,
          }}
        >
          <Box>{subscription.challenge.title}</Box>
        </Link>
      ))}
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);
