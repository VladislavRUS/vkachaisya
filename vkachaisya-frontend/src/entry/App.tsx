import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Welcome } from '../screens/Welcome';
import { Subscriptions } from '../screens/Subscriptions';
import { Routes } from './Routes';
import { CreateChallenge } from '../screens/CreateChallenge';
import { SubscriptionReportDay } from '../screens/SubscriptionReportDay';
import { SearchChallenges } from '../screens/SearchChallenges';
import { Subscription } from '../screens/Subscription';
import PrivateRoute from './PrivateRoute/PrivateRoute';

const App = () => (
  <Switch>
    <Route path={Routes.WELCOME} component={Welcome} />

    <PrivateRoute path={Routes.SUBSCRIPTIONS} component={Subscriptions} exact />
    <PrivateRoute path={Routes.SUBSCRIPTION} component={Subscription} exact />
    <PrivateRoute path={Routes.SUBSCRIPTION_REPORT_DAY} component={SubscriptionReportDay} />

    <PrivateRoute path={Routes.SEARCH_CHALLENGES} component={SearchChallenges} />
    <PrivateRoute path={Routes.CREATE_CHALLENGE} component={CreateChallenge} exact />

    <Redirect to={Routes.SUBSCRIPTIONS} />
  </Switch>
);

export { App };
