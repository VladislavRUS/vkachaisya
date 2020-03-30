import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { Routes } from '../Routes';
import { IApplicationState } from '../../store';
import { selectCurrentUser } from '../../store/user/selectors';
import { connect } from 'react-redux';

const mapStateToProps = (state: IApplicationState) => ({
  user: selectCurrentUser(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

type Props = StateProps & RouteProps;

const PrivateRoute: React.FC<Props> = ({ component, user, ...rest }: any) => {
  const routeComponent = (props: any) =>
    user ? React.createElement(component, props) : <Redirect to={Routes.INITIAL} />;
  return <Route {...rest} render={routeComponent} />;
};

export default connect(mapStateToProps)(PrivateRoute);
