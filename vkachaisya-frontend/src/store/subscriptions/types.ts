import { ISubscription } from '../../types';
import { ISubscriptionResult } from '../../types/index';

export interface ISubscriptionsState {
  subscriptions: ISubscription[];
  subscriptionResult: ISubscriptionResult | null;
  isFetchingSubscriptions: boolean;
  isFetchingSubscriptionResult: boolean;
}

export enum SubscriptionsActionTypes {
  GET_SUBSCRIPTIONS = '@@subscriptions/GET_SUBSCRIPTIONS',
  GET_SUBSCRIPTIONS_REQUEST = '@@subscriptions/GET_SUBSCRIPTIONS_REQUEST',
  GET_SUBSCRIPTIONS_SUCCESS = '@@subscriptions/GET_SUBSCRIPTIONS_SUCCESS',
  GET_SUBSCRIPTIONS_FAILURE = '@@subscriptions/GET_SUBSCRIPTIONS_FAILURE',

  GET_SUBSCRIPTION_RESULT = '@@subscriptions/GET_SUBSCRIPTION_RESULT',
  GET_SUBSCRIPTION_RESULT_REQUEST = '@@subscriptions/GET_SUBSCRIPTION_RESULT_REQUEST',
  GET_SUBSCRIPTION_RESULT_SUCCESS = '@@subscriptions/GET_SUBSCRIPTION_RESULT_SUCCESS',
  GET_SUBSCRIPTION_RESULT_FAILURE = '@@subscriptions/GET_SUBSCRIPTION_RESULT_FAILURE',

  CLEAR_USER_SUBSCRIPTION = '@@subscriptions/CLEAR_USER_SUBSCRIPTION',
}
