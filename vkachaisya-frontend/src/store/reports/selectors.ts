import { IApplicationState } from '../index';

export const selectReports = (state: IApplicationState) => state.reports.reports;
