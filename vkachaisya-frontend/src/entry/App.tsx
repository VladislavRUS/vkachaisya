import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Welcome } from '../screens/Welcome';
import { Challenges } from '../screens/Challenges';
import { Challenge } from '../screens/Challenge';
import { Routes } from './Routes';
import { Initial } from '../screens/Initital';
import { CreateChallenge } from '../screens/CreateChallenge';
import { ChallengeReportDay } from '../screens/ChallengeReportDay';

const App = () => (
  <Switch>
    <Route path={Routes.INITIAL} component={Initial} exact />
    <Route path={Routes.WELCOME} component={Welcome} />
    <Route path={Routes.CHALLENGES} component={Challenges} />
    <Route path={Routes.CREATE_CHALLENGE} component={CreateChallenge} exact />
    <Route path={Routes.CHALLENGE} component={Challenge} exact />
    <Route path={Routes.CHALLENGE_REPORT_DAY} component={ChallengeReportDay} />

    <Redirect to={Routes.INITIAL} />
  </Switch>
);

export { App };
