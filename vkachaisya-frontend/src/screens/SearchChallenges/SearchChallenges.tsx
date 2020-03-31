import React, { useEffect } from 'react';
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
  useEffect(() => {
    searchChallenges();
  }, [searchChallenges]);

  return (
    <Layout
      header={<Header />}
      body={
        <ChallengesList>
          {challenges.map((searchChallenge) => (
            <Box key={searchChallenge.challenge.id} mb="10px">
              <ChallengeCard {...searchChallenge.challenge} avatars={searchChallenge.avatars} iconName="plus" />
            </Box>
          ))}
        </ChallengesList>
      }
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchChallenges);
