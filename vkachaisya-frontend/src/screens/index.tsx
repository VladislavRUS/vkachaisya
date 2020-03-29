import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import { ProfileLoader } from '../components/ProfileLoader';
import { Welcome } from './welcome';
import { Challenges } from './challenges';
import { Challenge } from './challenge';
import { Report } from './challenge/report';
import { CreateChallenge } from './challenge/create';

const Routes = () => {
  return (
    <Router>
      <Switch>
        {/* <ProfileLoader> */}
        <Switch>
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/challenges" component={Challenges} />
          <Route exact path="/challenge/create" component={CreateChallenge} />
          <Route exact path="/challenge/:id" component={Challenge} />
          <Route exact path="/challenge/:id/report/:day" component={Report} />
          <Route path="/">
            <Redirect to="/challenges" />
          </Route>
        </Switch>
        {/* </ProfileLoader> */}
      </Switch>
    </Router>
  );
};

export default Routes;
