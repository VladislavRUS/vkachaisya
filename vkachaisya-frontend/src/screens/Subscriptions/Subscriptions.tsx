import React, { useEffect } from 'react';
import { Box, Typography, IconButton, Link, CircularProgress } from '@material-ui/core';
import { differenceInCalendarDays } from 'date-fns';
import { bindActionCreators, Dispatch } from 'redux';
import { getSubscriptions } from '../../store/subscriptions/actions';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import { AppBar } from '../../components/AppBar';
import { Link as RouterLink, generatePath, useHistory } from 'react-router-dom';
import { Routes } from '../../entry/Routes';
import {
  selectCurrentSubscriptions,
  selectFinishedSubscriptions,
  selectIsFetchingSubscriptions,
} from '../../store/subscriptions/selectors';
import { selectCurrentUser } from '../../store/user/selectors';
import { Icon } from '../../components/Icon';
import { NoSubscriptions } from './NoSubscriptions';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '../../components/ExpansionPanel';
import { ChallengeCard } from '../../components/ChallengeCard';
import { Layout } from '../../components/Layout';
import { FloatButton } from '../../components/FloatButton';
import { PageLoader } from '../../components/PageLoader';

const mapStateToProps = (state: IApplicationState) => ({
  user: selectCurrentUser(state),
  currentSubscriptions: selectCurrentSubscriptions(state),
  finishedSubscriptions: selectFinishedSubscriptions(state),
  isFetchingSubscriptions: selectIsFetchingSubscriptions(state),
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
  <AppBar
    left={
      <Link component={RouterLink} to={Routes.SEARCH_CHALLENGES}>
        <IconButton>
          <Icon name="search" size={18} />
        </IconButton>
      </Link>
    }
    center="Мои челленджи"
  />
);

const Subscriptions: React.FC<Props> = ({
  getSubscriptions,
  currentSubscriptions,
  finishedSubscriptions,
  user,
  isFetchingSubscriptions,
}) => {
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

  const hasChallenges = !!currentSubscriptions.length || !!finishedSubscriptions.length;

  return (
    <>
      <Layout
        header={<Header />}
        withScroll={hasChallenges}
        body={
          <>
            {!hasChallenges && !isFetchingSubscriptions && <NoSubscriptions />}

            {!hasChallenges && isFetchingSubscriptions && <PageLoader />}

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
      {hasChallenges && <FloatButton iconName="plus" onClick={() => history.push(Routes.CREATE_CHALLENGE)} />}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);
