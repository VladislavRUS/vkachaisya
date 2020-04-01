import React, { useEffect, useState } from 'react';
import { IApplicationState } from '../../store';
import { bindActionCreators, Dispatch } from 'redux';
import { clearSearchChallenges, searchChallenges } from '../../store/challenges/actions';
import {
  selectHasMoreChallenges,
  selectIsChallengesSearching,
  selectSearchChallenges,
} from '../../store/challenges/selectors';
import { Box, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppBar } from '../../components/AppBar';
import { BackLink } from '../../components/BackLink';
import { Routes } from '../../entry/Routes';
import { ChallengesList } from './SearchChallenges.styles';
import { ChallengeCard } from '../../components/ChallengeCard';
import { Typography } from '../../components/Typography';
import { Layout } from '../../components/Layout';
import { Modal } from '../../components/Modal';
import { IChallenge } from '../../types';

const mapStateToProps = (state: IApplicationState) => ({
  challenges: selectSearchChallenges(state),
  isSearching: selectIsChallengesSearching(state),
  hasMore: selectHasMoreChallenges(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      searchChallenges,
      clearSearchChallenges,
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
}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<IChallenge | null>(null);

  useEffect(() => {
    clearSearchChallenges();
    searchChallenges();
  }, [clearSearchChallenges, searchChallenges]);

  const join = (challenge: IChallenge) => {
    setCurrentChallenge(challenge);
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setCurrentChallenge(null);
  };

  const handleScroll = (e: any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (bottom && hasMore) {
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
            {isSearching && (
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
      <Modal.Join hashtag={currentChallenge?.hashtag || ''} onBackButtonClick={onCloseModal} open={showModal} />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchChallenges);
