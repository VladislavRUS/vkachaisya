import { fork, put, takeLatest, all, call } from 'redux-saga/effects';
import { SubscriptionsActionTypes } from './types';
import { getSubscriptionsAsync, getSubscriptionResult, getSubscriptionResultAsync } from './actions';
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

// WATCHERS
const watchers = [
  fork(function* watchGetSubscriptions() {
    yield takeLatest(SubscriptionsActionTypes.GET_SUBSCRIPTIONS, handleGetSubscriptions);
  }),
  fork(function* watchGetSubscriptionResult() {
    yield takeLatest(SubscriptionsActionTypes.GET_SUBSCRIPTION_RESULT, handleGetSubscriptionResult);
  }),
];

function* subscriptionsSaga() {
  yield all(watchers);
}

export { subscriptionsSaga };
