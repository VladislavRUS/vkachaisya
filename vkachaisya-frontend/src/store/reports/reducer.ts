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
};

export const reportsReducer = createReducer<IReportsState, ReportsActionType>(initialState)
  // Get reports
  .handleType(ReportsActionTypes.GET_REPORTS_REQUEST, (state) => ({ ...state, isFetching: true }))
  .handleType(ReportsActionTypes.GET_REPORTS_SUCCESS, (state, action) => ({
    ...state,
    isFetching: false,
    reports: [...action.payload],
  }))
  .handleType(ReportsActionTypes.GET_REPORTS_FAILURE, (state) => ({ ...state, isFetching: false }))

  // Clear reports
  .handleType(ReportsActionTypes.CLEAR_REPORTS, (state) => ({ ...state, reports: [], editReport: emptyEditReport }))

  // Set edit report
  .handleType(ReportsActionTypes.SET_EDIT_REPORT, (state, action) => ({
    ...state,
    editReport: { ...action.payload.editReport },
  }))

  // Create report
  .handleType(ReportsActionTypes.CREATE_REPORT_REQUEST, (state) => ({ ...state, isCreating: true }))
  .handleType(ReportsActionTypes.CREATE_REPORT_SUCCESS, (state, action) => ({
    ...state,
    isCreating: false,
    reports: [...state.reports, action.payload],
  }))
  .handleType(ReportsActionTypes.CREATE_REPORT_FAILURE, (state) => ({ ...state, isCreating: false }));
