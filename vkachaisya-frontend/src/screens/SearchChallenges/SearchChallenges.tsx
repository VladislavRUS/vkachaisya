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
import { selectJoinedChallenge } from '../../store/subscriptions/selectors';

const mapStateToProps = (state: IApplicationState) => ({
  challenges: selectUserSearchChallenges(state),
  isSearching: selectIsChallengesSearching(state),
  isCreating: selectIsChallengeCreating(state),
  hasMore: selectHasMoreChallenges(state),
  joinedChallenge: selectJoinedChallenge(state),
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

  return (
    <>
      <Layout
        header={<Header />}
        onScroll={handleScroll}
        body={
          <>
            {(isSearching || isCreating) && (
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <CircularProgress disableShrink={true} />
              </Box>
            )}

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
        open={Boolean(joinedChallenge)}
      />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchChallenges);
