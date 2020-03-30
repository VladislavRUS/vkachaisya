import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Welcome } from '../screens/Welcome';
import { Subscriptions } from '../screens/Subscriptions';
import { Routes } from './Routes';
import { Initial } from '../screens/Initital';
import { CreateChallenge } from '../screens/CreateChallenge';
import { SubscriptionReportDay } from '../screens/SubscriptionReportDay';
import { SearchChallenges } from '../screens/SearchChallenges';
import { Subscription } from '../screens/Subscription';
import PrivateRoute from './PrivateRoute/PrivateRoute';

const App = () => (
  <Switch>
    <Route path={Routes.INITIAL} component={Initial} exact />
    <PrivateRoute path={Routes.WELCOME} component={Welcome} />

    <PrivateRoute path={Routes.SUBSCRIPTIONS} component={Subscriptions} exact />
    <Route path={Routes.SUBSCRIPTION} component={Subscription} exact />
    <Route path={Routes.SUBSCRIPTION_REPORT_DAY} component={SubscriptionReportDay} />

    <PrivateRoute path={Routes.SEARCH_CHALLENGES} component={SearchChallenges} />
    <PrivateRoute path={Routes.CREATE_CHALLENGE} component={CreateChallenge} exact />

    <Redirect to={Routes.INITIAL} />
  </Switch>
);

export { App };
