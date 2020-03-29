import { all, takeLatest, fork, call, put } from 'redux-saga/effects';
import { ReportsActionTypes } from './types';
import { getReports, getReportsAsync } from './actions';
import { ReportsApi } from '../../api/reports-api';

// HANDLERS
function* handleGetReports(action: ReturnType<typeof getReports>) {
  yield put(getReportsAsync.request());

  const { userId, subscriptionId } = action.payload;

  try {
    const { data } = yield call(ReportsApi.getReportsByUserAndSubscription, userId, subscriptionId);
    yield put(getReportsAsync.success(data));
  } catch (e) {
    yield put(getReportsAsync.failure());
  }
}

// WATCHERS

const watchers = [
  fork(function* watchGetReports() {
    yield takeLatest(ReportsActionTypes.GET_REPORTS, handleGetReports);
  }),
];

function* reportsSaga() {
  yield all(watchers);
}

export { reportsSaga };
