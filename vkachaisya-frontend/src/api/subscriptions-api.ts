import { API_CLIENT } from './index';

export class SubscriptionsApi {
  static getSubscriptions = () => API_CLIENT.get('/api/subscriptions');
  static createSubscription = (challengeId: number) => API_CLIENT.post('/api/subscriptions', { challengeId });
  static getSubscriptionResult = (userId: number, subscriptionId: number) =>
    API_CLIENT.get(`/api/subscriptions/${subscriptionId}/result?userId=${userId}`);
}
