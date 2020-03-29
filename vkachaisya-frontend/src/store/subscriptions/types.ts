import { ISubscription } from '../../types';

export interface ISubscriptionsState {
  subscriptions: ISubscription[];
  userSubscription: ISubscription | null;
  isFetchingSubscriptions: boolean;
  isFetchingUserSubscription: boolean;
}

export enum SubscriptionsActionTypes {
  GET_SUBSCRIPTIONS = '@@subscriptions/GET_SUBSCRIPTIONS',
  GET_SUBSCRIPTIONS_REQUEST = '@@subscriptions/GET_SUBSCRIPTIONS_REQUEST',
  GET_SUBSCRIPTIONS_SUCCESS = '@@subscriptions/GET_SUBSCRIPTIONS_SUCCESS',
  GET_SUBSCRIPTIONS_FAILURE = '@@subscriptions/GET_SUBSCRIPTIONS_FAILURE',

  GET_USER_SUBSCRIPTION = '@@subscriptions/GET_USER_SUBSCRIPTION',
  GET_USER_SUBSCRIPTION_REQUEST = '@@subscriptions/GET_USER_SUBSCRIPTION_REQUEST',
  GET_USER_SUBSCRIPTION_SUCCESS = '@@subscriptions/GET_USER_SUBSCRIPTION_SUCCESS',
  GET_USER_SUBSCRIPTION_FAILURE = '@@subscriptions/GET_USER_SUBSCRIPTION_FAILURE',

  CLEAR_USER_SUBSCRIPTION = '@@subscriptions/CLEAR_USER_SUBSCRIPTION',
}
