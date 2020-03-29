import { fork, put, takeLatest, all, call } from 'redux-saga/effects';
import { SubscriptionsActionTypes } from './types';
import { getSubscriptionsAsync, getUserSubscription, getUserSubscriptionAsync } from './actions';
import { SubscriptionsApi } from '../../api/subscriptions-api';

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

function* handleGetUserSubscription(action: ReturnType<typeof getUserSubscription>) {
  yield put(getUserSubscriptionAsync.request());

  const { userId, subscriptionId } = action.payload;

  try {
    const { data } = yield call(SubscriptionsApi.getExtendedSubscriptionInformation, userId, subscriptionId);
    yield put(getUserSubscriptionAsync.success(data));
  } catch (e) {
    yield put(getUserSubscriptionAsync.failure());
  }
}

// WATCHERS
const watchers = [
  fork(function* watchGetSubscriptions() {
    yield takeLatest(SubscriptionsActionTypes.GET_SUBSCRIPTIONS, handleGetSubscriptions);
  }),
  fork(function* watchGetUserSubscription() {
    yield takeLatest(SubscriptionsActionTypes.GET_USER_SUBSCRIPTION, handleGetUserSubscription);
  }),
];

function* subscriptionsSaga() {
  yield all(watchers);
}

export { subscriptionsSaga };
