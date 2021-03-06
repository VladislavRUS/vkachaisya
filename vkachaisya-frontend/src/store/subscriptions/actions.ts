import { action, createAsyncAction } from 'typesafe-actions';
import { SubscriptionsActionTypes } from './types';
import { ISubscription } from '../../types';
import { IChallenge, ISubscriptionResult } from '../../types/index';

export const getSubscriptions = () => action(SubscriptionsActionTypes.GET_SUBSCRIPTIONS);
export const getSubscriptionsAsync = createAsyncAction(
  SubscriptionsActionTypes.GET_SUBSCRIPTIONS_REQUEST,
  SubscriptionsActionTypes.GET_SUBSCRIPTIONS_SUCCESS,
  SubscriptionsActionTypes.GET_SUBSCRIPTIONS_FAILURE,
)<undefined, ISubscription[], undefined>();

export const getSubscriptionResult = (userId: number, subscriptionId: number) =>
  action(SubscriptionsActionTypes.GET_SUBSCRIPTION_RESULT, { userId, subscriptionId });
export const getSubscriptionResultAsync = createAsyncAction(
  SubscriptionsActionTypes.GET_SUBSCRIPTION_RESULT_REQUEST,
  SubscriptionsActionTypes.GET_SUBSCRIPTION_RESULT_SUCCESS,
  SubscriptionsActionTypes.GET_SUBSCRIPTION_RESULT_FAILURE,
)<undefined, ISubscriptionResult, undefined>();

export const createSubscription = (challenge: IChallenge) =>
  action(SubscriptionsActionTypes.CREATE_SUBSCRIPTION, { challenge });
export const createSubscriptionAsync = createAsyncAction(
  SubscriptionsActionTypes.CREATE_SUBSCRIPTION_REQUEST,
  SubscriptionsActionTypes.CREATE_SUBSCRIPTION_SUCCESS,
  SubscriptionsActionTypes.CREATE_SUBSCRIPTION_FAILURE,
)<undefined, ISubscription, undefined>();

export const setJoinedChallenge = (joinedChallenge: IChallenge | null) =>
  action(SubscriptionsActionTypes.SET_JOINED_CHALLENGE, { joinedChallenge });

export const clearSubscriptionResult = () => action(SubscriptionsActionTypes.CLEAR_SUBSCRIPTION_RESULT);
