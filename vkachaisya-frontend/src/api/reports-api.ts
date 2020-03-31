import { API_CLIENT } from './index';

export class ReportsApi {
  static getReportsByUserAndSubscription = (userId: number, subscriptionId: number) =>
    API_CLIENT.get(`/api/reports?userId=${userId}&subscriptionId=${subscriptionId}`);
  static createReport = (body: any) => API_CLIENT.post(`/api/reports`, body);
}
