import React, { useEffect } from 'react';
import { IApplicationState } from '../../store';
import { bindActionCreators, Dispatch } from 'redux';
import { clearSearchChallenges, searchChallenges } from '../../store/challenges/actions';
import {
  selectHasMoreChallenges,
  selectIsChallengeCreating,
  selectIsChallengesSearching,
  selectUserSearchChallenges,
} from '../../store/challenges/selectors';
import { Box, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppBar } from '../../components/AppBar';
import { BackLink } from '../../components/BackLink';
import { Routes } from '../../entry/Routes';
import { ChallengesList } from './SearchChallenges.styles';
import { ChallengeCard } from '../../components/ChallengeCard';
import { Layout } from '../../components/Layout';
import { Modal } from '../../components/Modal';
import { IChallenge } from '../../types';
import { createSubscription, setJoinedChallenge } from '../../store/subscriptions/actions';
import {
  selectIsSubscriptionCreating,
  selectJoinedChallenge,
  selectJoinedSubscription,
} from '../../store/subscriptions/selectors';
import bridge from '@vkontakte/vk-bridge';
import { selectCurrentUser } from '../../store/user/selectors';
import { PageLoader } from '../../components/PageLoader';

const mapStateToProps = (state: IApplicationState) => ({
  challenges: selectUserSearchChallenges(state),
  isSearching: selectIsChallengesSearching(state),
  isCreating: selectIsSubscriptionCreating(state),
  hasMore: selectHasMoreChallenges(state),
  joinedChallenge: selectJoinedChallenge(state),
  joinedSubscription: selectJoinedSubscription(state),
  user: selectCurrentUser(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      searchChallenges,
      clearSearchChallenges,
      createSubscription,
      setJoinedChallenge,
    },
    dispatch,
  );

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = StateProps & DispatchProps;

const Header = () => <AppBar left={<BackLink to={Routes.SUBSCRIPTIONS} />} center="Выберите челлендж" />;

const SearchChallenges: React.FC<Props> = ({
  challenges,
  searchChallenges,
  clearSearchChallenges,
  isSearching,
  hasMore,
  createSubscription,
  isCreating,
  joinedChallenge,
  setJoinedChallenge,
  joinedSubscription,
  user,
}) => {
  useEffect(() => {
    clearSearchChallenges();
    searchChallenges();
  }, [clearSearchChallenges, searchChallenges]);

  const join = (challenge: IChallenge) => {
    createSubscription(challenge);
  };

  const onCloseModal = () => {
    setJoinedChallenge(null);
  };

  const handleScroll = (e: any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (bottom && hasMore && !isSearching) {
      searchChallenges();
    }
  };

  const onShareButtonClick = () => {
    if (joinedChallenge && joinedSubscription && user) {
      bridge.send('VKWebAppShowWallPostBox', {
        attachments: `https://vk.com/app7380006#/subscriptions/${joinedSubscription.id}/users/${user.id}`,
        message: `Я присоединился к челленджу "${joinedChallenge.title}"! \nОтслеживай мои результаты в приложении \n\n${joinedChallenge.hashtag}`,
      });
    }
  };

  return (
    <>
      <Layout
        header={<Header />}
        onScroll={handleScroll}
        body={
          <>
            {(isSearching || isCreating) && <PageLoader />}

            {challenges.length > 0 && (
              <ChallengesList>
                {challenges.map((searchChallenge) => (
                  <Box key={searchChallenge.challenge.id} mb="10px">
                    <ChallengeCard
                      {...searchChallenge}
                      {...searchChallenge.challenge}
                      onButtonClick={() => join(searchChallenge.challenge)}
                      iconName="plus"
                    />
                  </Box>
                ))}
                {isSearching && (
                  <Box
                    pt={2}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CircularProgress disableShrink={true} size={30} />
                  </Box>
                )}
              </ChallengesList>
            )}
          </>
        }
      />
      <Modal.Join
        hashtag={joinedChallenge?.hashtag || ''}
        onBackButtonClick={onCloseModal}
        onShareButtonClick={onShareButtonClick}
        open={Boolean(joinedChallenge)}
      />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchChallenges);
