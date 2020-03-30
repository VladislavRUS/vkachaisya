import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IApplicationState } from '../../store';
import { bindActionCreators, Dispatch } from 'redux';
import { searchChallenges } from '../../store/challenges/actions';
import { selectSearchChallenges } from '../../store/challenges/selectors';
import { Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppBar } from '../../components/AppBar';
import { SquareButton } from '../../components/SquareButton';
import { BackLink } from '../../components/BackLink';
import { Routes } from '../../entry/Routes';
import { Challenge } from './Challenge';
import { ChallengesList, Title, StyledLink } from './SearchChallenges.styles';

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
  <AppBar.Large
    left={<BackLink to={Routes.SUBSCRIPTIONS} />}
    center={
      <Title>
        Выберите челлендж или{' '}
        <StyledLink component={RouterLink} to={Routes.CREATE_CHALLENGE}>
          создайте свой
        </StyledLink>
      </Title>
    }
    right={
      <RouterLink to={Routes.CREATE_CHALLENGE}>
        <SquareButton iconName="plus" size="large" />
      </RouterLink>
    }
  />
);

const SearchChallenges: React.FC<Props> = ({ challenges, searchChallenges }) => {
  useEffect(() => {
    searchChallenges();
  }, [searchChallenges]);

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
