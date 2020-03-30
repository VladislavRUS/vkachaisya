import React, { useEffect } from 'react';
import { Typography, Paper } from '@material-ui/core';
import { IApplicationState } from '../../store';
import { bindActionCreators, Dispatch } from 'redux';
import { getAllChallenges } from '../../store/challenges/actions';
import { selectAllChallenges } from '../../store/challenges/selectors';
import { Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppBar } from '../../components/AppBar';
import { BackLink } from '../../components/BackLink';
import { Routes } from '../../entry/Routes';

const mapStateToProps = (state: IApplicationState) => ({
  allChallenges: selectAllChallenges(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getAllChallenges,
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

const SearchChallenges: React.FC<Props> = ({ allChallenges, getAllChallenges }) => {
  useEffect(() => {
    getAllChallenges();
  }, [getAllChallenges]);

  return (
    <Box bgcolor="grays:0" height="100%" width="100%">
      <Header />
      {[...allChallenges, { id: '1', title: 'dwede' }].map((challenge) => (
        <Box m={3}>
          <Paper elevation={0} square={true} key={challenge.id}>
            {challenge.title}
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchChallenges);
