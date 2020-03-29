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

export interface IApplicationState {
  users: IUserState;
  challenges: IChallengesState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    user: userReducer,
    challenges: challengesReducer,
    router: connectRouter(history),
  });

export function* rootSaga() {
  yield all([fork(userSaga), fork(challengesSaga)]);
}
