import React, { useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { getCurrentUser } from '../../store/user/actions';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getCurrentUser,
    },
    dispatch,
  );

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = DispatchProps;

const Initial: React.FC<Props> = ({ getCurrentUser }) => {
  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line
  }, []);

  return null;
};

export default connect(null, mapDispatchToProps)(Initial);
