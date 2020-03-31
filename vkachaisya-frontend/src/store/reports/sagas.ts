import { all, takeLatest, fork, call, put, select } from 'redux-saga/effects';
import { ReportsActionTypes } from './types';
import {
  createReport,
  createReportAsync,
  getReports,
  getReportsAsync,
  updateReport,
  updateReportAsync,
} from './actions';
import { ReportsApi } from '../../api/reports-api';
import { selectEditReport } from './selectors';

// HANDLERS
function* handleGetReports(action: ReturnType<typeof getReports>) {
  yield put(getReportsAsync.request());

  const { subscriptionId } = action.payload;

  try {
    const { data } = yield call(ReportsApi.getReportsBySubscription, subscriptionId);
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
    day: action.payload.day,
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

function* handleUpdateReport(action: ReturnType<typeof updateReport>) {
  yield put(updateReportAsync.request());

  const { reportId } = action.payload;

  const editReport: ReturnType<typeof selectEditReport> = yield select(selectEditReport);

  const body = {
    text: editReport.text,
    fileIds: editReport.files.map((file) => file.id),
  };

  try {
    const { data } = yield call(ReportsApi.updateReport, reportId, body);
    yield put(updateReportAsync.success(data));
  } catch (e) {
    yield put(updateReportAsync.failure());
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
  fork(function* watchUpdateReport() {
    yield takeLatest(ReportsActionTypes.UPDATE_REPORT, handleUpdateReport);
  }),
];

function* reportsSaga() {
  yield all(watchers);
}

export { reportsSaga };
