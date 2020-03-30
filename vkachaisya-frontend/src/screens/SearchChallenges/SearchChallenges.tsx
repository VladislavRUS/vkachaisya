import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { IApplicationState } from '../../store';
import { bindActionCreators, Dispatch } from 'redux';
import { searchChallenges } from '../../store/challenges/actions';
import { selectSearchChallenges } from '../../store/challenges/selectors';
import { Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppBar } from '../../components/AppBar';
import { BackLink } from '../../components/BackLink';
import { Routes } from '../../entry/Routes';
import { Challenge } from './Challenge';
import { ChallengesList } from './SearchChallenges.styles';

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
    center={
      <Typography variant="h1" noWrap={true}>
        Создание челленджа
      </Typography>
    }
  />
);

const SearchChallenges: React.FC<Props> = ({ challenges, searchChallenges }) => {
  useEffect(() => {
    searchChallenges();
  }, []);

  return (
    <Box bgcolor="grays:0" height="100%" width="100%">
      <Header />
      <ChallengesList>
        {challenges.map((searchChallenge) => (
          <Challenge key={searchChallenge.challenge.id} searchChallenge={searchChallenge} />
        ))}
      </ChallengesList>
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchChallenges);
