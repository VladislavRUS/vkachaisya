import { action, createAsyncAction } from 'typesafe-actions';
import { SubscriptionsActionTypes } from './types';
import { ISubscription } from '../../types';

export const getSubscriptions = () => action(SubscriptionsActionTypes.GET_SUBSCRIPTIONS);
export const getSubscriptionsAsync = createAsyncAction(
  SubscriptionsActionTypes.GET_SUBSCRIPTIONS_REQUEST,
  SubscriptionsActionTypes.GET_SUBSCRIPTIONS_SUCCESS,
  SubscriptionsActionTypes.GET_SUBSCRIPTIONS_FAILURE,
)<undefined, ISubscription[], undefined>();

export const getUserSubscription = (userId: number, subscriptionId: number) =>
  action(SubscriptionsActionTypes.GET_USER_SUBSCRIPTION, { userId, subscriptionId });
export const getUserSubscriptionAsync = createAsyncAction(
  SubscriptionsActionTypes.GET_USER_SUBSCRIPTION_REQUEST,
  SubscriptionsActionTypes.GET_USER_SUBSCRIPTION_SUCCESS,
  SubscriptionsActionTypes.GET_USER_SUBSCRIPTION_FAILURE,
)<undefined, ISubscription, undefined>();
