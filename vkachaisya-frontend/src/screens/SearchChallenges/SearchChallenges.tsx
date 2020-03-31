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
import JoinImage from '../../assets/images/join.svg';

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

const Header = () => (
  <AppBar.Small
    left={<BackLink to={Routes.SUBSCRIPTIONS} />}
    center={<Typography variant="h1">Выберите челлендж</Typography>}
    // right={
    //   <RouterLink to={Routes.CREATE_CHALLENGE}>
    //     <SquareButton iconName="plus" />
    //   </RouterLink>
    // }
  />
);

const SearchChallenges: React.FC<Props> = ({ challenges, searchChallenges }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    searchChallenges();
  }, [searchChallenges]);

  const join = () => {
    setShowModal(true);
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
                  onButtonClick={join}
                  iconName="plus"
                />
              </Box>
            ))}
          </ChallengesList>
        }
      />
      <Modal image={JoinImage} onBackButtonClick={() => setShowModal(false)} open={showModal}>
        <Typography color="grays:1" fontSize="21px" fontWeight={500} align="center">
          <Typography display="block">Поздравляем!</Typography>
          <Typography display="block">Вы присоединились</Typography>
          <Typography display="block">к новому челленджу</Typography>
          <Typography display="block" color="blues:0">
            #ВКачайсяБассейн
          </Typography>
        </Typography>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchChallenges);
