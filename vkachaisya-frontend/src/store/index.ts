import { IUserState } from './user/types';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { userReducer } from './user/reducer';
import { all, fork } from 'redux-saga/effects';
import { userSaga } from './user/sagas';
import { History } from 'history';
import { challengesSaga } from './challenges/sagas';
import { IChallengesState } from './challenges/types';
import { challengesReducer } from './challenges/reducer';
import { ISubscriptionsState } from './subscriptions/types';
import { subscriptionsReducer } from './subscriptions/reducer';
import { subscriptionsSaga } from './subscriptions/sagas';
import { IReportsState } from './reports/types';
import { reportsReducer } from './reports/reducer';
import { reportsSaga } from './reports/sagas';

export interface IApplicationState {
  user: IUserState;
  challenges: IChallengesState;
  subscriptions: ISubscriptionsState;
  reports: IReportsState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    user: userReducer,
    challenges: challengesReducer,
    subscriptions: subscriptionsReducer,
    reports: reportsReducer,
    router: connectRouter(history),
  });

export function* rootSaga() {
  yield all([fork(userSaga), fork(challengesSaga), fork(subscriptionsSaga), fork(reportsSaga)]);
}
