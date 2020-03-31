import React, { useEffect } from 'react';
import { Box, Typography, IconButton, Link } from '@material-ui/core';
import { bindActionCreators, Dispatch } from 'redux';
import { getSubscriptions } from '../../store/subscriptions/actions';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import { AppBar } from '../../components/AppBar';
import { Link as RouterLink, generatePath } from 'react-router-dom';
import { Routes } from '../../entry/Routes';
import { selectCurrentSubscriptions, selectFinishedSubscriptions } from '../../store/subscriptions/selectors';
import { selectCurrentUser } from '../../store/user/selectors';
import { Icon } from '../../components/Icon';
import { SquareButton } from '../../components/SquareButton';
import { NoSubscriptions } from './NoSubscriptions';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '../../components/ExpansionPanel';
import { ChallengeCard } from '../../components/ChallengeCard/ChallengeCard';

const mapStateToProps = (state: IApplicationState) => ({
  user: selectCurrentUser(state),
  currentSubscriptions: selectCurrentSubscriptions(state),
  finishedSubscriptions: selectFinishedSubscriptions(state),
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
      <Link component={RouterLink} to={Routes.SEARCH_CHALLENGES}>
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
      <Link component={RouterLink} to={Routes.CREATE_CHALLENGE}>
        <SquareButton iconName="plus" />
      </Link>
    }
  />
);

const Subscriptions: React.FC<Props> = ({ getSubscriptions, currentSubscriptions, finishedSubscriptions, user }) => {
  useEffect(() => {
    getSubscriptions();
  }, [getSubscriptions]);

  if (!user) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="stretch" height="100%" width="100%" bgcolor="grays:0">
      <Header />

      {!currentSubscriptions.length && !finishedSubscriptions.length && <NoSubscriptions />}

      {!!currentSubscriptions.length && (
        <Box mt="10px">
          <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary>Текущие</ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {currentSubscriptions.map((subscription) => (
                <Box mb={2} key={subscription.id}>
                  <Link
                    component={RouterLink}
                    to={{
                      pathname: generatePath(Routes.SUBSCRIPTION, { subscriptionId: subscription.id }),
                      search: `?userId=${user.id}`,
                    }}
                  >
                    <ChallengeCard {...subscription} iconName="arrow" />
                  </Link>
                </Box>
              ))}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Box>
      )}

      {!!finishedSubscriptions.length && (
        <ExpansionPanel defaultExpanded={true}>
          <ExpansionPanelSummary>Завершенные</ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {finishedSubscriptions.map((subscription) => (
              <Box mb={2} key={subscription.id}>
                <Link
                  component={RouterLink}
                  to={{
                    pathname: generatePath(Routes.SUBSCRIPTION, { subscriptionId: subscription.id }),
                    search: `?userId=${user.id}`,
                  }}
                >
                  <ChallengeCard {...subscription} iconName="arrow" />
                </Link>
              </Box>
            ))}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);
