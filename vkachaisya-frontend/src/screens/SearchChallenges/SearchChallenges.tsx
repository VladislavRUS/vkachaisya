import React, { useEffect, useState } from 'react';
import { IApplicationState } from '../../store';
import { bindActionCreators, Dispatch } from 'redux';
import { searchChallenges } from '../../store/challenges/actions';
import { selectSearchChallenges } from '../../store/challenges/selectors';
import { Box } from '@material-ui/core';
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
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      searchChallenges,
    },
    dispatch,
  );

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = StateProps & DispatchProps;

const Header = () => <AppBar.Small left={<BackLink to={Routes.SUBSCRIPTIONS} />} center="Выберите челлендж" />;

const SearchChallenges: React.FC<Props> = ({ challenges, searchChallenges }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<IChallenge | null>(null);

  useEffect(() => {
    searchChallenges();
  }, [searchChallenges]);

  const join = (challenge: IChallenge) => {
    setCurrentChallenge(challenge);
    setShowModal(true);
  };

  const onClodeModal = () => {
    setShowModal(false);
    setCurrentChallenge(null);
  };

  return (
    <>
      <Layout
        header={<Header />}
        body={
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
          </ChallengesList>
        }
      />
      <Modal.Join hashtag={currentChallenge?.hashtag || ''} onBackButtonClick={onClodeModal} open={showModal} />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchChallenges);
