import { IApplicationState } from '../index';

export const selectReports = (state: IApplicationState) => state.reports.reports;
export const selectEditReport = (state: IApplicationState) => state.reports.editReport;
export const selectIsFetchingReports = (state: IApplicationState) => state.reports.isFetching;

export const selectReportByDay = (state: IApplicationState, day: number) => {
  return state.reports.reports.find((report) => report.day === day);
};
