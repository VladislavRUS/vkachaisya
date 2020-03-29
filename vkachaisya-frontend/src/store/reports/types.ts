import { IReport } from '../../types';

export interface IReportsState {
  reports: IReport[];
  isFetching: boolean;
}

export enum ReportsActionTypes {
  GET_REPORTS = '@@reports/GET_REPORTS',
  GET_REPORTS_REQUEST = '@@reports/GET_REPORTS_REQUEST',
  GET_REPORTS_SUCCESS = '@@reports/GET_REPORTS_SUCCESS',
  GET_REPORTS_FAILURE = '@@reports/GET_REPORTS_FAILURE',

  CLEAR_REPORTS = '@@reports/CLEAR_REPORTS',
}
