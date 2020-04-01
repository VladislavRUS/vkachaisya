import { put, all, takeLatest, fork, call, select, debounce } from 'redux-saga/effects';
import { ChallengesActionTypes } from './types';
import { createChallenge, createChallengeAsync, searchChallengesAsync, getChallengesAsync } from './actions';
import { ChallengesApi } from '../../api/challenges-api';
import { goBack } from 'connected-react-router';
import { selectSearchChallenges } from './selectors';

export const TAKE_CHALLENGES = 10;

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

function* handleSearchChallenges() {
  const challenges: ReturnType<typeof selectSearchChallenges> = yield select(selectSearchChallenges);

  yield put(searchChallengesAsync.request());

  try {
    const { data } = yield call(ChallengesApi.searchChallenges, challenges.length, TAKE_CHALLENGES);
    yield put(searchChallengesAsync.success(data));
  } catch (e) {
    yield put(searchChallengesAsync.failure());
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
  fork(function* watchSearchChallenges() {
    yield debounce(500, ChallengesActionTypes.SEARCH_CHALLENGES, handleSearchChallenges);
  }),
  fork(function* watchCreateChallenge() {
    yield takeLatest(ChallengesActionTypes.CREATE_CHALLENGE, handleCreateChallenge);
  }),
];

function* challengesSaga() {
  yield all(watchers);
}

export { challengesSaga };
