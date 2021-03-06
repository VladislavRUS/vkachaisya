import { ISubscriptionsState, SubscriptionsActionTypes } from './types';
import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';

type SubscriptionsActionType = ActionType<typeof actions>;

const initialState: ISubscriptionsState = {
  subscriptions: [],
  subscriptionResult: null,
  isFetchingSubscriptions: false,
  isFetchingSubscriptionResult: false,
  isCreating: false,
  joinedChallenge: null,
};

export const subscriptionsReducer = createReducer<ISubscriptionsState, SubscriptionsActionType>(initialState)
  // Get subscriptions
  .handleType(
    SubscriptionsActionTypes.GET_SUBSCRIPTIONS_REQUEST,
    (state): ISubscriptionsState => ({ ...state, isFetchingSubscriptions: true }),
  )
  .handleType(
    SubscriptionsActionTypes.GET_SUBSCRIPTIONS_SUCCESS,
    (state, action): ISubscriptionsState => ({
      ...state,
      isFetchingSubscriptions: false,
      subscriptions: [...action.payload],
    }),
  )
  .handleType(
    SubscriptionsActionTypes.GET_SUBSCRIPTIONS_FAILURE,
    (state): ISubscriptionsState => ({ ...state, isFetchingSubscriptions: false }),
  )

  // Get subscription result
  .handleType(
    SubscriptionsActionTypes.GET_SUBSCRIPTION_RESULT_REQUEST,
    (state): ISubscriptionsState => ({ ...state, isFetchingSubscriptionResult: true }),
  )
  .handleType(
    SubscriptionsActionTypes.GET_SUBSCRIPTION_RESULT_SUCCESS,
    (state, action): ISubscriptionsState => ({
      ...state,
      isFetchingSubscriptionResult: false,
      subscriptionResult: action.payload,
    }),
  )
  .handleType(
    SubscriptionsActionTypes.GET_SUBSCRIPTION_RESULT_FAILURE,
    (state): ISubscriptionsState => ({ ...state, isFetchingSubscriptionResult: false }),
  )

  // Create subscription
  .handleType(
    SubscriptionsActionTypes.CREATE_SUBSCRIPTION_REQUEST,
    (state): ISubscriptionsState => ({ ...state, isCreating: true }),
  )
  .handleType(
    SubscriptionsActionTypes.CREATE_SUBSCRIPTION_SUCCESS,
    (state, action): ISubscriptionsState => ({
      ...state,
      isCreating: false,
      subscriptions: [...state.subscriptions, action.payload],
    }),
  )
  .handleType(
    SubscriptionsActionTypes.CREATE_SUBSCRIPTION_FAILURE,
    (state): ISubscriptionsState => ({ ...state, isCreating: true }),
  )

  // Joined challenge
  .handleType(
    SubscriptionsActionTypes.SET_JOINED_CHALLENGE,
    (state, action): ISubscriptionsState => ({ ...state, joinedChallenge: action.payload.joinedChallenge }),
  )

  // Clear subscription result
  .handleType(
    SubscriptionsActionTypes.CLEAR_SUBSCRIPTION_RESULT,
    (state): ISubscriptionsState => ({ ...state, subscriptionResult: null }),
  );
