import React, { useEffect, useState } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { Routes } from '../Routes';
import { IApplicationState } from '../../store';
import { selectCurrentUser, selectIsCurrentUserFetching } from '../../store/user/selectors';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { getCurrentUser } from '../../store/user/actions';
import { PageLoader } from '../../components/PageLoader';

const mapStateToProps = (state: IApplicationState) => ({
  user: selectCurrentUser(state),
  isFetching: selectIsCurrentUserFetching(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getCurrentUser,
    },
    dispatch,
  );

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = StateProps & DispatchProps & RouteProps;

const PrivateRoute: React.FC<Props> = ({ component, user, getCurrentUser, isFetching, ...rest }: any) => {
  const [requestWasTriggered, setRequestWasTriggered] = useState(false);

  useEffect(() => {
    if (!user) {
      getCurrentUser();
      setRequestWasTriggered(true);
    }
  }, []);

  if (user) {
    const routeComponent = (props: any) => React.createElement(component, props);
    return <Route {...rest} render={routeComponent} />;
  } else if (isFetching) {
    return <PageLoader />;
  } else if (!user && !isFetching && requestWasTriggered) {
    return <Redirect to={Routes.WELCOME} />;
  } else {
    return <PageLoader />;
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
