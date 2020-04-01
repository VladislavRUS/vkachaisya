import { IReportsState, ReportsActionTypes } from './types';
import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';

type ReportsActionType = ActionType<typeof actions>;

const emptyEditReport = {
  text: '',
  day: 1,
  files: [],
};

const initialState: IReportsState = {
  reports: [],
  editReport: emptyEditReport,
  isFetching: false,
  isCreating: false,
  isUpdating: false,
  isAttachingFile: false,
};

export const reportsReducer = createReducer<IReportsState, ReportsActionType>(initialState)
  // Get reports
  .handleType(ReportsActionTypes.GET_REPORTS_REQUEST, (state): IReportsState => ({ ...state, isFetching: true }))
  .handleType(
    ReportsActionTypes.GET_REPORTS_SUCCESS,
    (state, action): IReportsState => ({
      ...state,
      isFetching: false,
      reports: [...action.payload],
    }),
  )
  .handleType(ReportsActionTypes.GET_REPORTS_FAILURE, (state): IReportsState => ({ ...state, isFetching: false }))

  // Clear reports
  .handleType(
    ReportsActionTypes.CLEAR_REPORTS,
    (state): IReportsState => ({ ...state, reports: [], editReport: emptyEditReport }),
  )

  // Set edit report
  .handleType(
    ReportsActionTypes.SET_EDIT_REPORT,
    (state, action): IReportsState => ({
      ...state,
      editReport: { ...action.payload.editReport },
    }),
  )

  // Create report
  .handleType(ReportsActionTypes.CREATE_REPORT_REQUEST, (state): IReportsState => ({ ...state, isCreating: true }))
  .handleType(
    ReportsActionTypes.CREATE_REPORT_SUCCESS,
    (state, action): IReportsState => ({
      ...state,
      isCreating: false,
      reports: [...state.reports, action.payload],
    }),
  )
  .handleType(ReportsActionTypes.CREATE_REPORT_FAILURE, (state): IReportsState => ({ ...state, isCreating: false }))

  // Update report
  .handleType(ReportsActionTypes.UPDATE_REPORT_REQUEST, (state): IReportsState => ({ ...state, isUpdating: true }))
  .handleType(
    ReportsActionTypes.UPDATE_REPORT_SUCCESS,
    (state, action): IReportsState => ({
      ...state,
      isUpdating: false,
      reports: state.reports.map((report) => (report.id === action.payload.id ? action.payload : report)),
    }),
  )
  .handleType(ReportsActionTypes.UPDATE_REPORT_FAILURE, (state): IReportsState => ({ ...state, isUpdating: false }))

  // Attach file
  .handleType(ReportsActionTypes.ATTACH_FILE_REQUEST, (state): IReportsState => ({ ...state, isAttachingFile: true }))
  .handleType(
    ReportsActionTypes.ATTACH_FILE_SUCCESS,
    (state, action): IReportsState => ({
      ...state,
      isAttachingFile: false,
      editReport: { ...state.editReport, files: [...state.editReport.files, action.payload] },
    }),
  )
  .handleType(
    ReportsActionTypes.ATTACH_FILE_FAILURE,
    (state): IReportsState => ({
      ...state,
      isAttachingFile: false,
    }),
  );
