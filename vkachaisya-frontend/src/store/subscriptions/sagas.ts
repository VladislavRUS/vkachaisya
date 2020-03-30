import { fork, put, takeLatest, all, call } from 'redux-saga/effects';
import { SubscriptionsActionTypes } from './types';
import {
  getSubscriptionsAsync,
  getSubscriptionResult,
  getSubscriptionResultAsync,
  createSubscription,
  createSubscriptionAsync,
} from './actions';
import { SubscriptionsApi } from '../../api/subscriptions-api';
import { searchChallenges } from '../challenges/actions';

// HANDLERS
function* handleGetSubscriptions() {
  yield put(getSubscriptionsAsync.request());

  try {
    const { data } = yield call(SubscriptionsApi.getSubscriptions);
    yield put(getSubscriptionsAsync.success(data));
  } catch (e) {
    yield put(getSubscriptionsAsync.failure());
  }
}

function* handleGetSubscriptionResult(action: ReturnType<typeof getSubscriptionResult>) {
  yield put(getSubscriptionResultAsync.request());

  const { userId, subscriptionId } = action.payload;

  try {
    const { data } = yield call(SubscriptionsApi.getSubscriptionResult, userId, subscriptionId);
    yield put(getSubscriptionResultAsync.success(data));
  } catch (e) {
    yield put(getSubscriptionResultAsync.failure());
  }
}

function* handleCreateSubscription(action: ReturnType<typeof createSubscription>) {
  yield put(createSubscriptionAsync.request());

  const { challengedId } = action.payload;

  try {
    yield call(SubscriptionsApi.createSubscription, challengedId);
    yield put(createSubscriptionAsync.success());

    yield put(searchChallenges());
  } catch (e) {
    yield put(createSubscriptionAsync.failure());
  }
}

// WATCHERS
const watchers = [
  fork(function* watchGetSubscriptions() {
    yield takeLatest(SubscriptionsActionTypes.GET_SUBSCRIPTIONS, handleGetSubscriptions);
  }),
  fork(function* watchGetSubscriptionResult() {
    yield takeLatest(SubscriptionsActionTypes.GET_SUBSCRIPTION_RESULT, handleGetSubscriptionResult);
  }),
  fork(function* watchCreateSubscription() {
    yield takeLatest(SubscriptionsActionTypes.CREATE_SUBSCRIPTION, handleCreateSubscription);
  }),
];

function* subscriptionsSaga() {
  yield all(watchers);
}

export { subscriptionsSaga };
