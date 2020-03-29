import { put, all, takeLatest, fork, call } from 'redux-saga/effects';
import { ChallengesActionTypes } from './types';
import { createChallenge, createChallengeAsync, getAllChallengesAsync, getChallengesAsync } from './actions';
import { ChallengesApi } from '../../api/challenges-api';
import { goBack } from 'connected-react-router';

// HANDLERS
function* handleGetChallenges() {
  yield put(getChallengesAsync.request());

  try {
    const { data } = yield call(ChallengesApi.getChallenges);
    yield put(getChallengesAsync.success(data));
  } catch (e) {
    yield put(getChallengesAsync.failure());
  }
}

function* handleGetAllChallenges() {
  yield put(getAllChallengesAsync.request());

  try {
    const { data } = yield call(ChallengesApi.getAllChallenges);
    yield put(getAllChallengesAsync.success(data));
  } catch (e) {
    yield put(getAllChallengesAsync.failure());
  }
}

function* handleCreateChallenge(action: ReturnType<typeof createChallenge>) {
  yield put(createChallengeAsync.request());

  const { challenge } = action.payload;

  try {
    const { data } = yield call(ChallengesApi.createChallenge, challenge);
    yield put(createChallengeAsync.success(data));
    yield put(goBack());
  } catch (e) {
    yield put(createChallengeAsync.failure());
  }
}

// WATCHERS
const watchers = [
  fork(function* watchGetChallenges() {
    yield takeLatest(ChallengesActionTypes.GET_CHALLENGES, handleGetChallenges);
  }),
  fork(function* watchGetAllChallenges() {
    yield takeLatest(ChallengesActionTypes.GET_ALL_CHALLENGES, handleGetAllChallenges);
  }),
  fork(function* watchCreateChallenge() {
    yield takeLatest(ChallengesActionTypes.CREATE_CHALLENGE, handleCreateChallenge);
  }),
];

function* challengesSaga() {
  yield all(watchers);
}

export { challengesSaga };
