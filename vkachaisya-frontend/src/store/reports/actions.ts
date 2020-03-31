import { action, createAsyncAction } from 'typesafe-actions';
import { ReportsActionTypes } from './types';
import { IReport } from '../../types';
import { EditReport } from '../../types/index';

export const getReports = (userId: number, subscriptionId: number) =>
  action(ReportsActionTypes.GET_REPORTS, { userId, subscriptionId });
export const getReportsAsync = createAsyncAction(
  ReportsActionTypes.GET_REPORTS_REQUEST,
  ReportsActionTypes.GET_REPORTS_SUCCESS,
  ReportsActionTypes.GET_REPORTS_FAILURE,
)<undefined, IReport[], undefined>();

export const clearReports = () => action(ReportsActionTypes.CLEAR_REPORTS);

export const setEditReport = (editReport: EditReport) => action(ReportsActionTypes.SET_EDIT_REPORT, { editReport });

export const createReport = (subscriptionId: number) => action(ReportsActionTypes.CREATE_REPORT, { subscriptionId });
export const createReportAsync = createAsyncAction(
  ReportsActionTypes.CREATE_REPORT_REQUEST,
  ReportsActionTypes.CREATE_REPORT_SUCCESS,
  ReportsActionTypes.CREATE_REPORT_FAILURE,
)<undefined, IReport, undefined>();
