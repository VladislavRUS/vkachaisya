import React, { useEffect } from 'react';
import { Box, Typography, IconButton, Link } from '@material-ui/core';
import { differenceInCalendarDays } from 'date-fns';
import { bindActionCreators, Dispatch } from 'redux';
import { getSubscriptions } from '../../store/subscriptions/actions';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import { AppBar } from '../../components/AppBar';
import { Link as RouterLink, generatePath, useHistory } from 'react-router-dom';
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
  const history = useHistory();

  useEffect(() => {
    getSubscriptions();
  }, [getSubscriptions]);

  if (!user) {
    return null;
  }

  const onChooseChallenge = (subscriptionId: number) => {
    history.push(generatePath(Routes.SUBSCRIPTION, { subscriptionId, userId: user.id }));
  };

  return (
    <Layout
      header={<Header />}
      withScroll={!!currentSubscriptions.length || !!finishedSubscriptions.length}
      body={
        <>
          {!currentSubscriptions.length && !finishedSubscriptions.length && <NoSubscriptions />}

          {!!currentSubscriptions.length && (
            <Box mt="10px">
              <ExpansionPanel defaultExpanded={true}>
                <ExpansionPanelSummary>Текущие</ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {currentSubscriptions.map((subscription) => (
                    <Box mb="10px" key={subscription.id}>
                      <ChallengeCard
                        {...subscription}
                        iconName="arrow"
                        onButtonClick={() => onChooseChallenge(subscription.id)}
                        daysPassed={differenceInCalendarDays(new Date(), new Date(subscription.startDate))}
                      />
                    </Box>
                  ))}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Box>
          )}

          {!!finishedSubscriptions.length && (
            <Box mt="10px">
              <ExpansionPanel defaultExpanded={true}>
                <ExpansionPanelSummary>Прошедшие</ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {finishedSubscriptions.map((subscription) => (
                    <Box mb="10px" key={subscription.id}>
                      <ChallengeCard
                        {...subscription}
                        iconName="arrow"
                        done={true}
                        onButtonClick={() => onChooseChallenge(subscription.id)}
                      />
                    </Box>
                  ))}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Box>
          )}
        </>
      }
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);
