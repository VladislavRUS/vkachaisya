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
import { ChallengeCard } from '../../components/ChallengeCard';
import { Layout } from '../../components/Layout';

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
    <Layout
      header={<Header />}
      body={
        <Box width="100%">
          {!currentSubscriptions.length && !finishedSubscriptions.length && <NoSubscriptions />}

          {!!currentSubscriptions.length && (
            <Box mt="10px">
              <ExpansionPanel defaultExpanded={true}>
                <ExpansionPanelSummary>Текущие</ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {currentSubscriptions.map((subscription) => (
                    <Box mb="10px" key={subscription.id}>
                      <Link
                        component={RouterLink}
                        to={generatePath(Routes.SUBSCRIPTION, { subscriptionId: subscription.id, userId: user.id })}
                      >
                        <ChallengeCard
                          {...subscription}
                          iconName="arrow"
                          daysPassed={Math.round(Math.random() * subscription.days)}
                        />
                      </Link>
                    </Box>
                  ))}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Box>
          )}

          {!!finishedSubscriptions.length && (
            <Box mt="10px">
              <ExpansionPanel defaultExpanded={true}>
                <ExpansionPanelSummary>Завершенные</ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {finishedSubscriptions.map((subscription) => (
                    <Box mb="10px" key={subscription.id}>
                      <Link
                        underline="none"
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
        </Box>
      }
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);
