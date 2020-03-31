import { API_CLIENT } from './index';

export class ReportsApi {
  static getReportsBySubscription = (subscriptionId: number) =>
    API_CLIENT.get(`/api/subscriptions/${subscriptionId}/reports`);
  static createReport = (body: any) => API_CLIENT.post(`/api/reports`, body);
  static updateReport = (reportId: number, body: any) => API_CLIENT.put(`/api/reports/${reportId}`, body);
}
