import React from 'react';
import { Box } from '@material-ui/core';
import { Carousel } from '../../components/Carousel';
import { Button } from '../../components/Button';
import { bindActionCreators, Dispatch } from 'redux';
import { createCurrentUser } from '../../store/user/actions';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import { isCurrentUserCreating } from '../../store/user/selectors';

const mapStateToProps = (state: IApplicationState) => ({
  isCreating: isCurrentUserCreating(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      createCurrentUser,
    },
    dispatch,
  );

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = StateProps & DispatchProps;

const Welcome: React.FC<Props> = ({ isCreating, createCurrentUser }) => (
  <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%" width="100%">
    <Box p={3}>
      <Carousel />
    </Box>
    <Box p={3}>
      <Button color="primary" variant="contained" onClick={createCurrentUser} disabled={isCreating}>
        Начать
      </Button>
    </Box>
  </Box>
);

export default connect(null, mapDispatchToProps)(Welcome);
