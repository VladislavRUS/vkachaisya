import { ISubscription } from '../../types';
import { IChallenge, ISubscriptionResult } from '../../types/index';

export interface ISubscriptionsState {
  subscriptions: ISubscription[];
  subscriptionResult: ISubscriptionResult | null;
  isFetchingSubscriptions: boolean;
  isFetchingSubscriptionResult: boolean;
  isCreating: boolean;
  joinedChallenge: IChallenge | null;
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

  CREATE_SUBSCRIPTION = '@@subscriptions/CREATE_SUBSCRIPTION',
  CREATE_SUBSCRIPTION_REQUEST = '@@subscriptions/CREATE_SUBSCRIPTION_REQUEST',
  CREATE_SUBSCRIPTION_SUCCESS = '@@subscriptions/CREATE_SUBSCRIPTION_SUCCESS',
  CREATE_SUBSCRIPTION_FAILURE = '@@subscriptions/CREATE_SUBSCRIPTION_FAILURE',

  CLEAR_SUBSCRIPTION_RESULT = '@@subscriptions/CLEAR_SUBSCRIPTION_RESULT',

  SET_JOINED_CHALLENGE = '@@subscriptions/SET_JOINED_CHALLENGE',
}
