import { IReport } from '../../types';
import { EditReport } from '../../types/index';

export interface IReportsState {
  reports: IReport[];
  editReport: EditReport;
  isFetching: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isAttachingFile: boolean;
  hasCompleted: boolean;
}

export enum ReportsActionTypes {
  GET_REPORTS = '@@reports/GET_REPORTS',
  GET_REPORTS_REQUEST = '@@reports/GET_REPORTS_REQUEST',
  GET_REPORTS_SUCCESS = '@@reports/GET_REPORTS_SUCCESS',
  GET_REPORTS_FAILURE = '@@reports/GET_REPORTS_FAILURE',

  CREATE_REPORT = '@@reports/CREATE_REPORT',
  CREATE_REPORT_REQUEST = '@@reports/CREATE_REPORT_REQUEST',
  CREATE_REPORT_SUCCESS = '@@reports/CREATE_REPORT_SUCCESS',
  CREATE_REPORT_FAILURE = '@@reports/CREATE_REPORT_FAILURE',

  UPDATE_REPORT = '@@reports/UPDATE_REPORT',
  UPDATE_REPORT_REQUEST = '@@reports/UPDATE_REPORT_REQUEST',
  UPDATE_REPORT_SUCCESS = '@@reports/UPDATE_REPORT_SUCCESS',
  UPDATE_REPORT_FAILURE = '@@reports/UPDATE_REPORT_FAILURE',

  ATTACH_FILE = '@@reports/ATTACH_FILE',
  ATTACH_FILE_REQUEST = '@@reports/ATTACH_FILE_REQUEST',
  ATTACH_FILE_SUCCESS = '@@reports/ATTACH_FILE_SUCCESS',
  ATTACH_FILE_FAILURE = '@@reports/ATTACH_FILE_FAILURE',

  CLEAR_REPORTS = '@@reports/CLEAR_REPORTS',
  SET_HAS_COMPLETED = '@@reports/SET_HAS_COMPLETED',

  SET_EDIT_REPORT = '@@reports/SET_EDIT_REPORT',
}
