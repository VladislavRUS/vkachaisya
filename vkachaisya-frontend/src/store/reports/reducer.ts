import { IReportsState, ReportsActionTypes } from './types';
import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';

type ReportsActionType = ActionType<typeof actions>;

const initialState: IReportsState = {
  reports: [],
  isFetching: false,
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
  .handleType(ReportsActionTypes.CLEAR_REPORTS, (state) => ({ ...state, reports: [] }));
