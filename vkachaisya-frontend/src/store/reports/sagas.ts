import { all, takeLatest, fork, call, put, select } from 'redux-saga/effects';
import { ReportsActionTypes } from './types';
import { createReport, createReportAsync, getReports, getReportsAsync } from './actions';
import { ReportsApi } from '../../api/reports-api';
import { selectEditReport } from './selectors';
import { createSubscription } from '../subscriptions/actions';

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

function* handleCreateReport(action: ReturnType<typeof createReport>) {
  yield put(createReportAsync.request());

  const editReport: ReturnType<typeof selectEditReport> = yield select(selectEditReport);

  const body = {
    text: editReport.text,
    day: editReport.day,
    subscriptionId: action.payload.subscriptionId,
    fileIds: editReport.files.map((file) => file.id),
  };

  try {
    const { data } = yield call(ReportsApi.createReport, body);
    yield put(createReportAsync.success(data));
  } catch (e) {
    yield put(createReportAsync.failure());
  }
}

// WATCHERS

const watchers = [
  fork(function* watchGetReports() {
    yield takeLatest(ReportsActionTypes.GET_REPORTS, handleGetReports);
  }),
  fork(function* watchCreateReport() {
    yield takeLatest(ReportsActionTypes.CREATE_REPORT, handleCreateReport);
  }),
];

function* reportsSaga() {
  yield all(watchers);
}

export { reportsSaga };
