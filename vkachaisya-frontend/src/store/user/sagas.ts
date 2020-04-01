import { all, fork, takeEvery, put, call } from 'redux-saga/effects';
import { UserActionTypes } from './types';
import { createCurrentUser, createCurrentUserAsync, getCurrentUserAsync } from './actions';
import { UsersApi } from '../../api/users-api';
import { replace } from 'connected-react-router';
import { Routes } from '../../entry/Routes';

// HANDLERS

function* handleGetCurrentUser() {
  yield put(getCurrentUserAsync.request());

  try {
    const { data } = yield call(UsersApi.getCurrentUser);

    yield put(getCurrentUserAsync.success(data));
  } catch (e) {
    yield put(getCurrentUserAsync.failure());
  }
}

function* handleCreateCurrentUser(action: ReturnType<typeof createCurrentUser>) {
  yield put(createCurrentUserAsync.request());

  try {
    const { data } = yield call(UsersApi.createCurrentUser, action.payload.user);
    yield put(createCurrentUserAsync.success(data));
    yield put(replace(Routes.SUBSCRIPTIONS));
  } catch (e) {
    yield put(createCurrentUserAsync.failure());
  }
}

// WATCHERS
const watchers = [
  fork(function* watchGetCurrentUser() {
    yield takeEvery(UserActionTypes.GET_CURRENT_USER, handleGetCurrentUser);
  }),
  fork(function* watchCreateCurrentUser() {
    yield takeEvery(UserActionTypes.CREATE_CURRENT_USER, handleCreateCurrentUser);
  }),
];

function* userSaga() {
  yield all(watchers);
}

export { userSaga };
