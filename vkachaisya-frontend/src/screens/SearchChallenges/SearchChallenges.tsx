import React, { useEffect } from 'react';
import { IApplicationState } from '../../store';
import { bindActionCreators, Dispatch } from 'redux';
import { getAllChallenges } from '../../store/challenges/actions';
import { selectAllChallenges } from '../../store/challenges/selectors';
import { Box } from '@material-ui/core';
import { connect } from 'react-redux';

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

const SearchChallenges: React.FC<Props> = ({ allChallenges, getAllChallenges }) => {
  useEffect(() => {
    getAllChallenges();
  }, [getAllChallenges]);

  return (
    <Box>
      {allChallenges.map((challenge) => (
        <Box key={challenge.id}>{challenge.title}</Box>
      ))}
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchChallenges);
