import { action, createAsyncAction } from 'typesafe-actions';
import { ReportsActionTypes } from './types';
import { IReport } from '../../types';

export const getReports = (userId: number, subscriptionId: number) =>
  action(ReportsActionTypes.GET_REPORTS, { userId, subscriptionId });
export const getReportsAsync = createAsyncAction(
  ReportsActionTypes.GET_REPORTS_REQUEST,
  ReportsActionTypes.GET_REPORTS_SUCCESS,
  ReportsActionTypes.GET_REPORTS_FAILURE,
)<undefined, IReport[], undefined>();

export const clearReports = () => action(ReportsActionTypes.CLEAR_REPORTS);
