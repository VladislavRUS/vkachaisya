import { API_CLIENT } from './index';

export class SubscriptionsApi {
  static getSubscriptions = () => API_CLIENT.get('/api/subscriptions');
  static getExtendedSubscriptionInformation = (userId: number, subscriptionId: number) =>
    API_CLIENT.get(`/api/subscriptions/${subscriptionId}?userId=${userId}`);
}
